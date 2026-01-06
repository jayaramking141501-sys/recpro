import { useState } from 'react'
import { ReactionForm } from './components/ReactionForm'
import { ReactionResult } from './components/ReactionResult'
import { predictReaction, ReactionResult as ReactionResultType } from './lib/reactionService'
import './App.css'

function App() {
  const [result, setResult] = useState<ReactionResultType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (reactant: string, reagent: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const prediction = await predictReaction(reactant, reagent)

      if (prediction) {
        setResult(prediction)
      } else {
        setError('No reaction found. Try different reactants or check spelling.')
      }
    } catch (err) {
      setError('An error occurred while predicting the reaction.')
      console.error('Prediction error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>RecPro</h1>
          <p className="tagline">Organic Chemistry Reaction Predictor</p>
          <p className="subtitle">Master organic chemistry reactions. Predict products, understand mechanisms, and ace your exams.</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <section className="search-section">
            <h2>Predict a Reaction</h2>
            <ReactionForm onSearch={handleSearch} isLoading={isLoading} />
          </section>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {result && (
            <section className="results-section">
              <h2>Prediction Results</h2>
              <ReactionResult result={result} />
            </section>
          )}

          <section className="info-section">
            <div className="info-card">
              <h3>How It Works</h3>
              <ol>
                <li>Enter a reactant (e.g., alkene, benzene, alcohol)</li>
                <li>Enter reagent(s) or conditions (e.g., HBr, H2SO4, KOH)</li>
                <li>Get instant predictions with mechanisms and conditions</li>
              </ol>
            </div>

            <div className="info-card">
              <h3>Features</h3>
              <ul>
                <li>Organic and inorganic reaction databases</li>
                <li>Exact and fuzzy matching algorithms</li>
                <li>Detailed mechanism explanations</li>
                <li>Reaction conditions and types</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 RecPro - Chemistry Learning Tool</p>
      </footer>
    </div>
  )
}

export default App
