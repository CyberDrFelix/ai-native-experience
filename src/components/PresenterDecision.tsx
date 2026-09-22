import { useEffect } from 'react'
import type { DecisionChoice } from '../content/editions'

type Props = {
  active: boolean
  choices: DecisionChoice[]
  selectedId: string | null
  showConsequence: boolean
  onSelect: (id: string) => void
}

export function PresenterDecision({ active, choices, selectedId, showConsequence, onSelect }: Props) {
  useEffect(() => {
    if (!active) return
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (!/^[a-d]$/.test(key)) return
      const index = key.charCodeAt(0) - 97
      if (index >= 0 && index < choices.length) {
        event.preventDefault()
        onSelect(choices[index].id)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, choices, onSelect])

  const selected = choices.find(choice => choice.id === selectedId)
  if (showConsequence && selected) return <DecisionConsequence choice={selected} />

  return (
    <div className="decision-options" role="group" aria-label="Select a response">
      {choices.map((choice, index) => <button key={choice.id} className={selectedId === choice.id ? 'selected' : ''} aria-pressed={selectedId === choice.id} onClick={() => onSelect(choice.id)}>
        <span>{String.fromCharCode(65 + index)}</span><strong>{choice.label}</strong><small>PRESS {String.fromCharCode(65 + index)}</small>
      </button>)}
    </div>
  )
}

function DecisionConsequence({ choice }: { choice: DecisionChoice }) {
  return (
    <div className="decision-consequence" aria-live="polite">
      <div className="consequence-heading"><span>OPTION {choice.id.toUpperCase()}</span><h2>{choice.label}</h2></div>
      {choice.metrics && <div className="consequence-metrics">{choice.metrics.map(metric => <div key={metric.label}><small>{metric.label}</small><strong>{metric.value}</strong></div>)}</div>}
      {(choice.ai || choice.human) && <div className="role-split">
        <div><small>AI</small>{choice.ai?.map(item => <strong key={item}>{item}</strong>)}</div>
        <div><small>HUMAN</small>{choice.human?.map(item => <strong key={item}>{item}</strong>)}</div>
      </div>}
      {choice.risk && <div className="consequence-risk"><small>RISK</small><p>{choice.risk}</p></div>}
      <p className="consequence-outcome">{choice.outcome}</p>
    </div>
  )
}
