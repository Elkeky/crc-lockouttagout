import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('loto-lang') || 'ar'
  )

  useEffect(() => {
    localStorage.setItem('loto-lang', lang)
    const isRtl = lang === 'ar'
    document.documentElement.lang = lang
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
  }, [lang])

  function t(key) {
    return translations[lang]?.[key] ?? translations['ar'][key] ?? key
  }

  function toggleLang() {
    setLang(l => (l === 'ar' ? 'en' : 'ar'))
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRtl: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
