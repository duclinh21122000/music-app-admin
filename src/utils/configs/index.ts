export const appConfig = {
  title: 'Music App',
}

export const locales = ['vi', 'en'] as const

export const defaultLocale: Locale = 'vi'

export type Locale = (typeof locales)[number]
