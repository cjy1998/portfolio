"use server";

import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_COOKIE,
  type Locale,
} from "./config";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value as Locale | undefined;
  return value && LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}

export async function setLocale(locale: Locale) {
  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

export async function toggleLocale() {
  const current = await getLocale();
  const next: Locale = current === "cn" ? "en" : "cn";
  await setLocale(next);
  return next;
}
