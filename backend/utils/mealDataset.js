// Sample Indian meal dataset (rule-based, viva friendly)
export const indianMeals = {
  breakfast: [
    { name: 'Moong Dal Chilla', calories: 320, tags: ['veg', 'high-protein'], ingredients: { protein: ['Moong Dal'], vegetables: ['Onion', 'Tomato', 'Coriander'], grains: [] } },
    { name: 'Oats Upma', calories: 280, tags: ['veg'], ingredients: { protein: [], vegetables: ['Carrot', 'Peas', 'Onion'], grains: ['Oats'] } },
    { name: 'Egg Bhurji + Roti', calories: 360, tags: ['non-veg', 'high-protein'], ingredients: { protein: ['Eggs'], vegetables: ['Onion', 'Tomato'], grains: ['Wheat Flour'] } },
    { name: 'Poha', calories: 300, tags: ['veg'], ingredients: { protein: ['Peanuts'], vegetables: ['Onion', 'Curry Leaves'], grains: ['Poha'] } }
  ],
  lunch: [
    { name: 'Rajma Chawal', calories: 540, tags: ['veg'], ingredients: { protein: ['Rajma'], vegetables: ['Onion', 'Tomato', 'Ginger'], grains: ['Rice'] } },
    { name: 'Grilled Chicken + Roti', calories: 590, tags: ['non-veg', 'high-protein'], ingredients: { protein: ['Chicken'], vegetables: ['Cucumber', 'Lemon'], grains: ['Wheat Flour'] } },
    { name: 'Paneer Salad Bowl', calories: 460, tags: ['veg', 'high-protein'], ingredients: { protein: ['Paneer'], vegetables: ['Lettuce', 'Cucumber', 'Bell Pepper'], grains: [] } },
    { name: 'Sambar + Brown Rice', calories: 500, tags: ['veg'], ingredients: { protein: ['Toor Dal'], vegetables: ['Drumstick', 'Carrot', 'Pumpkin'], grains: ['Brown Rice'] } }
  ],
  dinner: [
    { name: 'Khichdi + Curd', calories: 420, tags: ['veg'], ingredients: { protein: ['Moong Dal', 'Curd'], vegetables: ['Carrot', 'Peas'], grains: ['Rice'] } },
    { name: 'Fish Curry + Millet', calories: 510, tags: ['non-veg'], ingredients: { protein: ['Fish'], vegetables: ['Onion', 'Tomato', 'Curry Leaves'], grains: ['Millet'] } },
    { name: 'Dal Tadka + Roti', calories: 470, tags: ['veg'], ingredients: { protein: ['Toor Dal'], vegetables: ['Onion', 'Tomato'], grains: ['Wheat Flour'] } },
    { name: 'Tofu Stir Fry', calories: 400, tags: ['veg'], ingredients: { protein: ['Tofu'], vegetables: ['Broccoli', 'Bell Pepper', 'Garlic'], grains: [] } }
  ]
}

function pickMeal(meals, filters) {
  if (!filters?.length) return meals[0]
  const match = meals.find((m) => filters.every((f) => m.tags.includes(f)))
  return match || meals[0]
}

export function generateMealPlan(filters = []) {
  return {
    breakfast: pickMeal(indianMeals.breakfast, filters),
    lunch: pickMeal(indianMeals.lunch, filters),
    dinner: pickMeal(indianMeals.dinner, filters)
  }
}

export function getWorkoutPlan(goal) {
  if (goal === 'loss') {
    return {
      type: 'Cardio',
      items: ['Brisk walk - 30 mins', 'Jump rope - 10 mins', 'Cycling - 20 mins', 'HIIT - 15 mins']
    }
  }
  if (goal === 'gain') {
    return {
      type: 'Strength Training',
      items: ['Squats 3x10', 'Push-ups 3x12', 'Deadlifts 3x8', 'Pull-ups 3x6']
    }
  }
  return {
    type: 'Mixed / Maintenance',
    items: ['Yoga - 20 mins', 'Light jog - 20 mins', 'Mobility routine - 15 mins']
  }
}

export function buildGroceryList(mealPlan) {
  const groups = { vegetables: new Set(), grains: new Set(), protein: new Set() }
  Object.values(mealPlan).forEach((meal) => {
    meal.ingredients.vegetables.forEach((i) => groups.vegetables.add(i))
    meal.ingredients.grains.forEach((i) => groups.grains.add(i))
    meal.ingredients.protein.forEach((i) => groups.protein.add(i))
  })
  return {
    vegetables: [...groups.vegetables],
    grains: [...groups.grains],
    protein: [...groups.protein]
  }
}
