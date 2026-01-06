/*
  # Create Chemistry Reaction Tables

  1. New Tables
    - `organic_reactions`
      - `id` (uuid, primary key)
      - `reactant` (text) - The starting material (e.g., "alkene")
      - `reagent` (text) - The reagent/conditions (e.g., "hbr")
      - `product` (text) - The product formed
      - `reaction_type` (text) - Type of reaction (e.g., "Electrophilic Addition")
      - `mechanism` (text) - Mechanism description
      - `conditions` (text) - Required conditions
      - `created_at` (timestamptz)
    
    - `inorganic_reactions`
      - `id` (uuid, primary key)
      - `reactant` (text) - First reactant
      - `reagent` (text) - Second reactant/reagent
      - `product` (text) - The product formed
      - `reaction_type` (text) - Type of reaction
      - `mechanism` (text) - Mechanism description
      - `conditions` (text) - Required conditions
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (educational tool)
*/

CREATE TABLE IF NOT EXISTS organic_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reactant text NOT NULL,
  reagent text NOT NULL,
  product text NOT NULL,
  reaction_type text NOT NULL,
  mechanism text NOT NULL,
  conditions text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inorganic_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reactant text NOT NULL,
  reagent text NOT NULL,
  product text NOT NULL,
  reaction_type text NOT NULL,
  mechanism text NOT NULL,
  conditions text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE organic_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inorganic_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read organic reactions"
  ON organic_reactions
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can read inorganic reactions"
  ON inorganic_reactions
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_organic_reactant_reagent ON organic_reactions(reactant, reagent);
CREATE INDEX IF NOT EXISTS idx_inorganic_reactant_reagent ON inorganic_reactions(reactant, reagent);