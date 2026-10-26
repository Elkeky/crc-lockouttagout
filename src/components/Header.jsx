import { useLang } from '../LanguageContext'

export default function Header() {
  const { t, toggleLang } = useLang()

  return (
    <header className="site-header">
      <div className="hazard-stripe" />
      <div className="header-inner">
        <div className="header-logo">
          LOTO
          <span>{t('header.subtitle')}</span>
        </div>
        <button
          className="lang-toggle"
          onClick={toggleLang}
          aria-label={t('lang.label')}
          id="lang-toggle-btn"
        >
          {t('lang.toggle')}
        </button>
      </div>
    </header>
  )
}
