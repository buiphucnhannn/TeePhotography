import vi from "./vi";
import en from "./en";
import { defaultLocale, locales } from "@/data/site";

const dictionaries = { vi, en };

export const hasLocale = (locale) => locales.includes(locale);
export const getDictionary = (locale) => dictionaries[hasLocale(locale) ? locale : defaultLocale];
