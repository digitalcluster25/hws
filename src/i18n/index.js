import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ruLabels  from './locales/ru/labels.json'
import enLabels  from './locales/en/labels.json'
import deLabels  from './locales/de/labels.json'
import elLabels  from './locales/el/labels.json'

import ruContent from './locales/ru/content.json'
import enContent from './locales/en/content.json'
import deContent from './locales/de/content.json'
import elContent from './locales/el/content.json'

// Deep merge: override wins over base
function mergeDeep(base, override) {
  if (!override) return base
  const out = Array.isArray(base) ? [...base] : { ...base }
  for (const k of Object.keys(override)) {
    if (
      override[k] !== null &&
      typeof override[k] === 'object' &&
      !Array.isArray(override[k]) &&
      typeof base[k] === 'object' &&
      !Array.isArray(base[k])
    ) {
      out[k] = mergeDeep(base[k] || {}, override[k])
    } else {
      out[k] = override[k]
    }
  }
  return out
}

function loadOverrides() {
  try { return JSON.parse(localStorage.getItem('hws-i18n-overrides') || '{}') }
  catch { return {} }
}

const ov = loadOverrides()

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        labels:  mergeDeep(ruLabels,  ov?.ru?.labels),
        content: mergeDeep(ruContent, ov?.ru?.content),
      },
      en: {
        labels:  mergeDeep(enLabels,  ov?.en?.labels),
        content: mergeDeep(enContent, ov?.en?.content),
      },
      de: {
        labels:  mergeDeep(deLabels,  ov?.de?.labels),
        content: mergeDeep(deContent, ov?.de?.content),
      },
      el: {
        labels:  mergeDeep(elLabels,  ov?.el?.labels),
        content: mergeDeep(elContent, ov?.el?.content),
      },
    },
    fallbackLng: {
      de:      ['de', 'en', 'ru'],
      el:      ['el', 'en', 'ru'],
      default: ['en', 'ru'],
    },
    defaultNS: 'labels',
    ns: ['labels', 'content'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'hws-lang',
    },
    interpolation: { escapeValue: false },
    returnObjects: true,
  })

export default i18n

// Helpers for admin panel
export { ruLabels, enLabels, deLabels, elLabels }
export { ruContent, enContent, deContent, elContent }

/** Save admin overrides and apply to running i18n instance */
export function saveAdminOverride(lang, ns, flatKey, value) {
  const ov = loadOverrides()
  if (!ov[lang]) ov[lang] = {}
  if (!ov[lang][ns]) ov[lang][ns] = {}
  // set nested path from flatKey e.g. "nav.menu"
  const parts = flatKey.split('.')
  let cur = ov[lang][ns]
  parts.forEach((p, i) => {
    if (i === parts.length - 1) { cur[p] = value }
    else { if (!cur[p]) cur[p] = {}; cur = cur[p] }
  })
  localStorage.setItem('hws-i18n-overrides', JSON.stringify(ov))
  // apply immediately
  const base = ns === 'labels'
    ? { ru: ruLabels, en: enLabels, de: deLabels, el: elLabels }[lang]
    : { ru: ruContent, en: enContent, de: deContent, el: elContent }[lang]
  i18n.addResourceBundle(lang, ns, mergeDeep(base, ov[lang][ns]), true, true)
}

/** Export merged JSON for a language/ns */
export function exportTranslation(lang, ns) {
  const base = ns === 'labels'
    ? { ru: ruLabels, en: enLabels, de: deLabels, el: elLabels }[lang]
    : { ru: ruContent, en: enContent, de: deContent, el: elContent }[lang]
  const ov = loadOverrides()
  return mergeDeep(base, ov?.[lang]?.[ns])
}
