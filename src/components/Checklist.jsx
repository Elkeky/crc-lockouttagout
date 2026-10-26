import { useState } from 'react'
import { useLang } from '../LanguageContext'

const STEP_KEYS = [
  'checklist.step1',
  'checklist.step2',
  'checklist.step3',
  'checklist.step4',
  'checklist.step5',
  'checklist.step6',
  'checklist.step7',
]

const PROGRESS_STEPS = 6 // steps 1-6 count; step 7 is post-work

function renderStep(template, breaker, panel) {
  return template.replace(/{Q}/g, breaker).replace(/{panel}/g, panel)
}

export default function Checklist({ breaker, panel }) {
  const { t } = useLang()
  const [checked, setChecked] = useState(Array(STEP_KEYS.length).fill(false))

  function toggle(index) {
    setChecked(prev => {
      const next = [...prev]
      if (next[index]) {
        // Uncheck this and all later steps
        for (let i = index; i < next.length; i++) next[i] = false
      } else {
        if (index === 0 || next[index - 1]) next[index] = true
      }
      return next
    })
  }

  const progressCount = checked.slice(0, PROGRESS_STEPS).filter(Boolean).length
  const progressPct = Math.round((progressCount / PROGRESS_STEPS) * 100)
  const allDone = checked.slice(0, PROGRESS_STEPS).every(Boolean)

  return (
    <div className="info-card" style={{ marginTop: '0.5rem' }}>
      <div className="info-card-header">
        <span>📋</span>
        {t('checklist.title')}
      </div>

      <div className="checklist-progress-wrap">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="progress-label">
          <span>{t('checklist.progress')}</span>
          <span>{progressCount} / {PROGRESS_STEPS}</span>
        </div>
      </div>

      {allDone && (
        <div className="complete-banner">{t('checklist.complete')}</div>
      )}

      <div className="checklist-steps">
        {STEP_KEYS.map((key, i) => {
          const isLocked = i > 0 && !checked[i - 1]
          const isDone = checked[i]
          return (
            <div
              key={i}
              className={`checklist-step ${isLocked ? 'locked' : ''} ${isDone ? 'done' : ''}`}
            >
              <span className="step-number">{i + 1}</span>
              <button
                className={`step-check ${isDone ? 'checked' : ''} ${isLocked ? 'locked' : ''}`}
                onClick={() => !isLocked && toggle(i)}
                aria-label={isDone ? t('checklist.aria.uncheck') : t('checklist.aria.check')}
                aria-disabled={isLocked}
                disabled={isLocked}
                id={`step-${i + 1}`}
              >
                {isDone ? '✓' : ''}
              </button>
              <span className="step-text">
                {renderStep(t(key), breaker, panel)}
                {i === 5 && (
                  <span className="step-warning">
                    {t('checklist.step6.warning')}
                  </span>
                )}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
