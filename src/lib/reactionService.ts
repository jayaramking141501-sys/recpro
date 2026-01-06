import { supabase, Reaction } from './supabase'
import { findBestMatch } from './fuzzyMatch'

export interface ReactionResult {
  reaction: Reaction
  matchType: 'exact' | 'fuzzy'
  reactionCategory: 'organic' | 'inorganic'
  confidence?: number
}

export async function predictReaction(
  reactant: string,
  reagent: string
): Promise<ReactionResult | null> {
  const cleanReactant = reactant.toLowerCase().trim()
  const cleanReagent = reagent.toLowerCase().trim()

  const organicExact = await searchExactMatch(
    cleanReactant,
    cleanReagent,
    'organic_reactions'
  )
  if (organicExact) {
    return {
      reaction: organicExact,
      matchType: 'exact',
      reactionCategory: 'organic',
    }
  }

  const inorganicExact = await searchExactMatch(
    cleanReactant,
    cleanReagent,
    'inorganic_reactions'
  )
  if (inorganicExact) {
    return {
      reaction: inorganicExact,
      matchType: 'exact',
      reactionCategory: 'inorganic',
    }
  }

  const organicFuzzy = await searchFuzzyMatch(
    cleanReactant,
    cleanReagent,
    'organic_reactions'
  )
  if (organicFuzzy) {
    return organicFuzzy
  }

  const inorganicFuzzy = await searchFuzzyMatch(
    cleanReactant,
    cleanReagent,
    'inorganic_reactions'
  )
  if (inorganicFuzzy) {
    return inorganicFuzzy
  }

  return null
}

async function searchExactMatch(
  reactant: string,
  reagent: string,
  table: string
): Promise<Reaction | null> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('reactant', reactant)
    .eq('reagent', reagent)
    .maybeSingle()

  if (error) {
    console.error('Error searching exact match:', error)
    return null
  }

  return data
}

async function searchFuzzyMatch(
  reactant: string,
  reagent: string,
  table: string
): Promise<ReactionResult | null> {
  const { data, error } = await supabase.from(table).select('*')

  if (error || !data) {
    console.error('Error fetching reactions for fuzzy match:', error)
    return null
  }

  const query = `${reactant} + ${reagent}`
  const candidates = data.map((r) => ({
    reactant: r.reactant,
    reagent: r.reagent,
  }))

  const bestMatch = findBestMatch(query, candidates, 0.7)

  if (bestMatch) {
    const matchedReaction = data.find(
      (r) =>
        r.reactant === bestMatch.reactant && r.reagent === bestMatch.reagent
    )

    if (matchedReaction) {
      return {
        reaction: matchedReaction,
        matchType: 'fuzzy',
        reactionCategory: table === 'organic_reactions' ? 'organic' : 'inorganic',
        confidence: Math.round(bestMatch.score * 100),
      }
    }
  }

  return null
}

export async function getAllReactions(): Promise<{
  organic: Reaction[]
  inorganic: Reaction[]
}> {
  const [organicResponse, inorganicResponse] = await Promise.all([
    supabase.from('organic_reactions').select('*').order('reactant'),
    supabase.from('inorganic_reactions').select('*').order('reactant'),
  ])

  return {
    organic: organicResponse.data || [],
    inorganic: inorganicResponse.data || [],
  }
}
