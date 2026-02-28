# Implement Internationalization (i18n)

This change implements an internationalization (i18n) system to manage translations.

## Plan

1.  **Install i18next:** Add the `i18next` and `react-i18next` packages to the project.
2.  **Create Translation Files:** Create a `locales` directory with JSON files for each language (e.g., `en.json`, `fr.json`).
3.  **Configure i18next:** Create a configuration file to initialize `i18next` with the desired languages and settings.
4.  **Integrate with React:** Wrap the main application component with the `I18nextProvider` to make the translation functions available throughout the component tree.
5.  **Refactor Components:** Replace hardcoded text with the `t()` translation function.
