import { items } from "@/items";

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Options = {
  prompt: string;
  type: (typeof items)[number]["name"];
};
2;
export type Item = {
  options: Options;
  response: string;
  createdAt: number;
};

export type ItineraryItem = {
  name: string;
  description: string;
  example: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  items?: Item[];
  credits?: number | "Unlimited";
};
