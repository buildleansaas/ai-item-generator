import slugify from "@sindresorhus/slugify";
import colors from "tailwindcss/colors";

export const classNames = [
  {
    color: colors.red,
    background: "bg-gradient-to-br from-red-50 to-red-100",
    title: "text-red-800",
    focusWithin: "focus-within:outline-red-500",
    focusVisible: "focus-visible:outline-red-500",
  },
  {
    color: colors.orange,
    background: "bg-gradient-to-br from-orange-50 to-orange-100",
    title: "text-orange-800",
    focusWithin: "focus-within:outline-orange-500",
    focusVisible: "focus-visible:outline-orange-500",
  },
  {
    color: colors.amber,
    background: "bg-gradient-to-br from-amber-50 to-amber-100",
    title: "text-amber-800",
    focusWithin: "focus-within:outline-amber-500",
    focusVisible: "focus-visible:outline-amber-500",
  },
  {
    color: colors.yellow,
    background: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    title: "text-yellow-800",
    focusWithin: "focus-within:outline-yellow-500",
    focusVisible: "focus-visible:outline-yellow-500",
  },
  {
    color: colors.lime,
    background: "bg-gradient-to-br from-lime-50 to-lime-100",
    title: "text-lime-800",
    focusWithin: "focus-within:outline-lime-500",
    focusVisible: "focus-visible:outline-lime-500",
  },
  {
    color: colors.green,
    background: "bg-gradient-to-br from-green-50 to-green-100",
    title: "text-green-800",
    focusWithin: "focus-within:outline-green-500",
    focusVisible: "focus-visible:outline-green-500",
  },
  {
    color: colors.emerald,
    background: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    title: "text-emerald-800",
    focusWithin: "focus-within:outline-emerald-500",
    focusVisible: "focus-visible:outline-emerald-500",
  },
  {
    color: colors.teal,
    background: "bg-gradient-to-br from-teal-50 to-teal-100",
    title: "text-teal-800",
    focusWithin: "focus-within:outline-teal-500",
    focusVisible: "focus-visible:outline-teal-500",
  },
  {
    color: colors.cyan,
    background: "bg-gradient-to-br from-cyan-50 to-cyan-100",
    title: "text-cyan-800",
    focusWithin: "focus-within:outline-cyan-500",
    focusVisible: "focus-visible:outline-cyan-500",
  },
  {
    color: colors.sky,
    background: "bg-gradient-to-br from-sky-50 to-sky-100",
    title: "text-sky-800",
    focusWithin: "focus-within:outline-sky-500",
    focusVisible: "focus-visible:outline-sky-500",
  },
  {
    color: colors.blue,
    background: "bg-gradient-to-br from-blue-50 to-blue-100",
    title: "text-blue-800",
    focusWithin: "focus-within:outline-blue-500",
    focusVisible: "focus-visible:outline-blue-500",
  },
  {
    color: colors.indigo,
    background: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    title: "text-indigo-800",
    focusWithin: "focus-within:outline-indigo-500",
    focusVisible: "focus-visible:outline-indigo-500",
  },
  {
    color: colors.violet,
    background: "bg-gradient-to-br from-violet-50 to-violet-100",
    title: "text-violet-800",
    focusWithin: "focus-within:outline-violet-500",
    focusVisible: "focus-visible:outline-violet-500",
  },
  {
    color: colors.purple,
    background: "bg-gradient-to-br from-purple-50 to-purple-100",
    title: "text-purple-800",
    focusWithin: "focus-within:outline-purple-500",
    focusVisible: "focus-visible:outline-purple-500",
  },
  {
    color: colors.fuchsia,
    background: "bg-gradient-to-br from-fuchsia-50 to-fuchsia-100",
    title: "text-fuchsia-800",
    focusWithin: "focus-within:outline-fuchsia-500",
    focusVisible: "focus-visible:outline-fuchsia-500",
  },
  {
    color: colors.pink,
    background: "bg-gradient-to-br from-pink-50 to-pink-100",
    title: "text-pink-800",
    focusWithin: "focus-within:outline-pink-500",
    focusVisible: "focus-visible:outline-pink-500",
  },
  {
    color: colors.rose,
    background: "bg-gradient-to-br from-rose-50 to-rose-100",
    title: "text-rose-800",
    focusWithin: "focus-within:outline-rose-500",
    focusVisible: "focus-visible:outline-rose-500",
  },
];

export const items = (
  [
    {
      href: "weekend-getaway",
      name: "Weekend Getaway",
      description:
        "Start your Friday early and come home late Sunday. Let us know where you're at, what you're looking for and we'll plan a getaway for you.",
      example:
        "I get off work Friday at 3:00pm and would love to do something this weekend a bit spontaneously. I live in Washington, D.C. I am okay traveling up to 3 hours to go somewhere that I can enjoy good food, accessible hikes and wineries. I don't have to work until 9:00am Monday, so if the drive is not very far from where I live, maybe 1 hour, I wouldn't mind staying a night somewhere between the weekend getaway and my house to enjoy an early evening in a different town that has a nice coffee shop that I can visit before I head to work.",
    },
  ] as const
).map((item, index) => ({
  ...item,
  slug: slugify(item.name),
  href: "/item/" + slugify(item.name),
  classNames: classNames[index % classNames.length],
  indefiniteArticle: ["a", "e", "i", "o", "u"].includes(
    item.name[0].toLowerCase()
  )
    ? "an"
    : "a",
}));

export type TypeOfItem = (typeof items)[number];
