import slugify from "@sindresorhus/slugify";
import colors from "tailwindcss/colors";

const classNames = [
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
      name: "Example Name",
      description: "Example Description",
      example: {
        // TODO: extend example types
        author: "Unknown",
        text: "",
      },
      steps: ["one", "two", "three"],
    },
    {
      name: "Haiku",
      description:
        "A haiku is a traditional form of Japanese poetry consisting of three lines. It is known for its brevity and focus on capturing a single moment or observation from nature. Haiku items often evoke a sense of tranquility, simplicity, and connection with the natural world.",
      example: {
        author: "Matsuo Basho",
        text: "An old silent pond...\nA frog jumps into the pond,\nsplash! Silence again.",
      },
      steps: [
        "Choose a subject: Select a specific moment, scene, or aspect of nature that you want to capture in your haiku. It could be a seasonal event, a natural phenomenon, or a simple observation from the natural world.",
        "Observe and immerse yourself: Take the time to observe your chosen subject closely. Pay attention to the sensory details, colors, sounds, and textures associated with it. Immerse yourself in the present moment and try to capture its essence.",
        "Determine the structure: Remember that a haiku consists of three lines with a syllable pattern of 5-7-5. Decide how you will divide your thoughts or observations into these three lines while adhering to the syllable count.",
        "Express the moment: Use precise and evocative language to convey your observation. Focus on conveying the sensory details and emotions associated with the moment. Be concise and avoid unnecessary words or explanations.",
        "Incorporate seasonal reference: Consider including a word or phrase that alludes to the season in which the moment or observation takes place. This adds depth and context to your haiku, connecting it to the natural cycles and traditions of haiku.",
        "Create a contrast: Introduce a contrast or a shift between the lines of your haiku to create a sense of surprise or deeper meaning. This can be a contrast in imagery, emotions, or ideas. The contrast adds depth and resonance to your haiku.",
        "Revise and refine: After writing your initial draft, review and revise your haiku. Pay attention to the syllable count, the clarity of your expression, and the overall impact of the item. Consider if there are any words or phrases that can be refined or replaced to enhance the item's power.",
        "Reflect and share: Read your haiku aloud and reflect on its meaning and effect. Consider the emotions and imagery it evokes. Share your haiku with others to gather feedback and perspectives.",
      ],
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
