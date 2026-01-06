# RecPro - Chemistry Reaction Predictor

Master organic chemistry reactions. Predict products, understand mechanisms, and ace your exams.

## Overview

RecPro is a comprehensive chemistry learning tool that helps students predict reaction products, understand mechanisms, and learn reaction conditions. The application features both organic and inorganic reaction databases with intelligent exact and fuzzy matching capabilities.

## Features

- **Dual Database System**: Separate databases for organic and inorganic reactions
- **Exact Matching**: Instant lookup for known reactant-reagent combinations
- **Fuzzy Matching**: Smart algorithm finds similar reactions when exact matches aren't found
- **Detailed Information**: Get product names, reaction types, mechanisms, and required conditions
- **Modern UI**: Clean, responsive design optimized for learning
- **Real-time Predictions**: Fast database queries with Supabase backend

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Styling**: Custom CSS with modern design principles

## How It Works

1. **User Input**: Enter a reactant and reagent (e.g., "alkene" + "hbr")
2. **Exact Lookup**: System checks for exact matches in both organic and inorganic databases
3. **Fuzzy Matching**: If no exact match, the system uses edit distance algorithm to find similar reactions
4. **Results Display**: Shows product, reaction type, mechanism, and conditions

## Database Structure

### Organic Reactions
- Includes 10+ common organic reactions
- Covers addition, elimination, substitution, and aromatic reactions
- Examples: alkene halogenation, alcohol dehydration, aromatic nitration

### Inorganic Reactions
- Includes 20+ inorganic reactions
- Covers combination, displacement, neutralization, and precipitation
- Examples: metal oxidation, acid-base reactions, metal-water reactions

## Development

```bash
npm install
npm run dev
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ReactionForm.tsx
│   └── ReactionResult.tsx
├── lib/                # Core logic
│   ├── supabase.ts     # Database client
│   ├── reactionService.ts  # Prediction logic
│   └── fuzzyMatch.ts   # Matching algorithm
├── App.tsx             # Main application
├── App.css             # Application styles
└── main.tsx            # Entry point
```

## Educational Value

- Saves time by eliminating textbook searches
- Provides instant mechanism explanations
- Helps understand reaction patterns
- Suitable for exam preparation
- Foundation for more advanced chemistry tools
