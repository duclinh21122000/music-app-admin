import { cookies } from 'next/headers'

import { defaultLocale } from '../configs'
import { COOKIE_NAME } from '../constants'

export const uuid = () => {
  return Math.floor(Math.random() * 1000000)
}

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: string) {
  cookies().set(COOKIE_NAME, locale)
}
