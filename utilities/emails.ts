import * as Brevo from "@sendinblue/client";
import { firestore } from "./firestore";
import { FieldValue } from "firebase-admin/firestore";
import { FREE_CREDITS } from "./constants";

if (process.env.BREVO_API_KEY === undefined) {
  throw new Error("Missing Brevo API key");
}

const api = new Brevo.TransactionalEmailsApi();
api.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const poetryTips = "poetry&#8203;.tips";
const textSignature = `Greg\nCreator, Poetry Tips`;
const htmlSignature = `<p>Greg<br/>Creator, Poetry Tips</p>`;

const emailTemplates = {
  "Welcome to poetry.tips": ({
    url,
  }: {
    url: string;
  }): Brevo.SendSmtpEmail => ({
    sender: {
      name: "Poetry Tips",
      email: "accounts@poetry.tips",
    },
    textContent: `At ${poetryTips} we don't use passwords, just click the link below to log in:\n\n${url}`,
    htmlContent: `<body><p>At ${poetryTips} we don't use passwords, just click the link below to log in:<br/><br/><a href="${url}">Log in to ${poetryTips}</a></p></body>`,
  }),
  "50% off credits at poetry.tips": (): Brevo.SendSmtpEmail => ({
    sender: {
      name: "Poetry Tips",
      email: "greg@poetry.tips",
    },
    textContent: `Hello,\n\nWant to generate some more poems on ${poetryTips}?\n\nGet 50% off credits using the link below:\n\nhttps://poetry.tips/credits\n\n${textSignature}\n\nP.S. If you've got any questions, reply to this email and I'll get back to you.`,
    htmlContent: `<body><p>Hello,</p><p>Want to generate some more poems on ${poetryTips}?</p><p><a href="https://poetry.tips/credits">Get 50% off credits using this link</a></p>${htmlSignature}<p>P.S. If you've got any questions, reply to this email and I'll get back to you.</p></body>`,
  }),
  "You've got credits left": (): Brevo.SendSmtpEmail => ({
    sender: {
      name: "Poetry Tips",
      email: "greg@poetry.tips",
    },
    textContent: `Hello,\n\nWhen you sign up to ${poetryTips}, you get ${FREE_CREDITS} free credits to generate poems.\n\nClick the link below to generate another poem:\n\nhttps://poetry.tips\n\n${textSignature}\n\nP.S. If you've got any questions, reply to this email and I'll get back to you.`,
    htmlContent: `<body><p>Hello,</p><p>When you sign up to ${poetryTips}, you get ${FREE_CREDITS} free credits to generate poems.</p><p><a href="https://poetry.tips">Click this link to generate another poem</a></p>${htmlSignature}<p>P.S. If you've got any questions, reply to this email and I'll get back to you.</p></body>`,
  }),
} as const;

export type EmailTemplate = keyof typeof emailTemplates;

export async function sendEmail<TEmailTemplate extends EmailTemplate>(
  to: string | string[],
  emailTemplate: TEmailTemplate,
  ...emailParams: Parameters<
    (typeof emailTemplates)[TEmailTemplate]
  >[0] extends undefined
    ? []
    : Parameters<(typeof emailTemplates)[TEmailTemplate]>
) {
  const emailArray = Array.isArray(to) ? to : [to];

  if (emailArray.length === 0) {
    return;
  }

  await Promise.allSettled(
    emailArray.map(async (email) => {
      const {
        docs: [user],
      } = await firestore
        .collection("users")
        .where("email", "==", email)
        .limit(1)
        .get();

      if (user === undefined) {
        return;
      }

      await firestore
        .collection("users")
        .doc(user.id)
        .update({
          emails: FieldValue.arrayUnion({
            subject: emailTemplate,
            sentAt: Date.now(),
          }),
        });

      await api.sendTransacEmail({
        to: [{ email }],
        subject: emailTemplate,
        // @ts-ignore
        ...emailTemplates[emailTemplate].apply(null, emailParams),
      });
    })
  );
}
