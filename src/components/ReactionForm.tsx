import { useState } from 'react'

interface ReactionFormProps {
  onSearch: (reactant: string, reagent: string) => void
  isLoading: boolean
}

export function ReactionForm({ onSearch, isLoading }: ReactionFormProps) {
  const [reactant, setReactant] = useState('')
  const [reagent, setReagent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (reactant.trim() && reagent.trim()) {
      onSearch(reactant, reagent)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="reaction-form">
      <div className="form-group">
        <label htmlFor="reactant">Reactant</label>
        <input
          id="reactant"
          type="text"
          value={reactant}
          onChange={(e) => setReactant(e.target.value)}
          placeholder="e.g., alkene, benzene, na, mg"
          disabled={isLoading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="reagent">Reagent / Conditions</label>
        <input
          id="reagent"
          type="text"
          value={reagent}
          onChange={(e) => setReagent(e.target.value)}
          placeholder="e.g., hbr, h2so4, cl2, naoh"
          disabled={isLoading}
          required
        />
      </div>

      <button type="submit" disabled={isLoading} className="predict-btn">
        {isLoading ? 'Predicting...' : 'Predict Reaction'}
      </button>
    </form>
  )
}
