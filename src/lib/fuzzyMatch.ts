export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim()
  const s2 = str2.toLowerCase().trim()

  if (s1 === s2) return 1.0

  const longer = s1.length > s2.length ? s1 : s2
  const shorter = s1.length > s2.length ? s2 : s1

  if (longer.length === 0) return 1.0

  const editDistance = getEditDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

function getEditDistance(s1: string, s2: string): number {
  const costs: number[] = []

  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j
      } else if (j > 0) {
        let newValue = costs[j - 1]
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
        }
        costs[j - 1] = lastValue
        lastValue = newValue
      }
    }
    if (i > 0) costs[s2.length] = lastValue
  }

  return costs[s2.length]
}

export function findBestMatch(
  query: string,
  candidates: { reactant: string; reagent: string }[],
  cutoff: number = 0.7
): { reactant: string; reagent: string; score: number } | null {
  let bestMatch: { reactant: string; reagent: string; score: number } | null = null
  let bestScore = 0

  const queryStr = query.toLowerCase().trim()

  for (const candidate of candidates) {
    const candidateStr = `${candidate.reactant} + ${candidate.reagent}`.toLowerCase().trim()
    const score = calculateSimilarity(queryStr, candidateStr)

    if (score > bestScore && score >= cutoff) {
      bestScore = score
      bestMatch = { ...candidate, score }
    }
  }

  return bestMatch
}
