const manageTranslations = require("react-intl-translations-manager").default;

// es2015 import
// import manageTranslations from 'react-intl-translations-manager';

manageTranslations({
  messagesDirectory: "src/translations/extractedMessages",
  translationsDirectory: "src/translations/locales/",
  languages: ["it"] // any language you need
});
