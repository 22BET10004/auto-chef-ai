const mockedFoodByName = {
  'apple.jpg': { food: 'Apple', calories: 95 },
  'banana.jpg': { food: 'Banana', calories: 110 },
  'rice.jpg': { food: 'Cooked Rice (1 bowl)', calories: 210 },
  'idli.jpg': { food: 'Idli (2 pieces)', calories: 150 },
  'paneer.jpg': { food: 'Paneer Curry (1 serving)', calories: 320 }
}

export function detectFoodFromFileName(fileName = '') {
  const key = fileName.toLowerCase()
  return mockedFoodByName[key] || { food: 'Mixed Meal (estimated)', calories: 280 }
}
