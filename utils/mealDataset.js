const baseMeals = {
  breakfast: [
    { name: 'Oats Upma', calories: 280, tags: ['veg', 'high-protein', 'south-indian'] },
    { name: 'Moong Dal Chilla', calories: 320, tags: ['veg', 'high-protein', 'north-indian'] },
    { name: 'Egg Bhurji Toast', calories: 360, tags: ['non-veg', 'high-protein'] },
    { name: 'Tofu Poha', calories: 300, tags: ['vegan', 'indian'] }
  ],
  lunch: [
    { name: 'Rajma Rice', calories: 540, tags: ['veg', 'north-indian'] },
    { name: 'Grilled Chicken + Roti', calories: 590, tags: ['non-veg', 'high-protein'] },
    { name: 'Paneer Salad Bowl', calories: 460, tags: ['veg', 'high-protein'] },
    { name: 'Sambar Brown Rice', calories: 500, tags: ['vegan', 'south-indian'] }
  ],
  dinner: [
    { name: 'Khichdi + Curd', calories: 420, tags: ['veg', 'indian'] },
    { name: 'Fish Curry + Millet', calories: 510, tags: ['non-veg'] },
    { name: 'Tofu Stir Fry', calories: 400, tags: ['vegan', 'keto'] },
    { name: 'Punjabi Dal + Roti', calories: 470, tags: ['veg', 'punjabi'] }
  ]
}

function matchesFilters(meal, filters) {
  return filters.every((filter) => meal.tags.includes(filter))
}

export function getPersonalizedMealPlan(filters = []) {
  const safeFilters = Array.isArray(filters) ? filters : []
  return Object.fromEntries(
    Object.entries(baseMeals).map(([slot, meals]) => {
      const filtered = safeFilters.length ? meals.filter((m) => matchesFilters(m, safeFilters)) : meals
      return [slot, filtered[0] || meals[0]]
    })
  )
}

export function getWorkoutSuggestion(goal) {
  if (goal === 'loss') return ['Brisk walk - 30 mins', 'Jump rope - 10 mins', 'Cycling - 20 mins']
  if (goal === 'gain') return ['Strength training - 45 mins', 'Compound lifts', 'Protein recovery walk - 15 mins']
  return ['Yoga - 20 mins', 'Mobility routine - 15 mins', 'Light jog - 20 mins']
}

export function getRegionalFilter(region) {
  const map = {
    north: 'north-indian',
    south: 'south-indian',
    punjabi: 'punjabi'
  }
  return map[region] || 'indian'
}
