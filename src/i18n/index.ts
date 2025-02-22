import { createI18n } from 'vue-i18n'
import pt from './locales/pt.ts'
import en from './locales/pt.ts'

const i18n = createI18n({
  locale: 'pt', // Standart locale
  fallbackLocale: 'en', //  Fallback for locale
  messages: {
    pt,
    en,
  },
})

export default i18n
