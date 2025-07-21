import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: {
      tests: {
        hello: "Hello world!",
      },
    },
    fr: {
      tests: {
        hello: "Bonjour à tous !",
      },
    },
  },
});
