import { ReactionResult as ReactionResultType } from '../lib/reactionService'

interface ReactionResultProps {
  result: ReactionResultType
}

export function ReactionResult({ result }: ReactionResultProps) {
  const { reaction, matchType, reactionCategory, confidence } = result

  return (
    <div className="reaction-result">
      <div className="result-header">
        <div className="badges">
          <span className={`badge badge-${reactionCategory}`}>
            {reactionCategory.toUpperCase()}
          </span>
          <span className={`badge badge-${matchType}`}>
            {matchType === 'exact' ? 'EXACT MATCH' : `FUZZY MATCH (${confidence}%)`}
          </span>
        </div>
      </div>

      <div className="result-content">
        <div className="result-section">
          <h3>Product</h3>
          <p className="product-name">{reaction.product}</p>
        </div>

        <div className="result-section">
          <h3>Reaction Type</h3>
          <p>{reaction.reaction_type}</p>
        </div>

        <div className="result-section">
          <h3>Mechanism</h3>
          <p>{reaction.mechanism}</p>
        </div>

        <div className="result-section">
          <h3>Conditions</h3>
          <p>{reaction.conditions}</p>
        </div>
      </div>
    </div>
  )
}
