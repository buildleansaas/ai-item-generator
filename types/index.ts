import { items } from "@/items";

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Options = {
  prompt: string;
  type: (typeof items)[number]["name"] | "Random Item";
};

export type Item = {
  options: Options;
  response: string;
  createdAt: number;
};

export type User = {
  id: string;
  email: string;
  name: string;
  items?: Item[];
  credits?: number | "Unlimited";
};
