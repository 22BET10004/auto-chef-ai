const responses = [
  { keys: ['what should i eat', 'eat today'], answer: 'Try a balanced day: Moong Dal Chilla for breakfast, Rajma Chawal for lunch, and Khichdi for dinner.' },
  { keys: ['calories in rice'], answer: 'One bowl (150g cooked) of white rice is around 200-220 kcal.' },
  { keys: ['weight loss', 'diet for weight loss'], answer: 'Focus on high-protein, high-fiber meals: dal, sprouts, paneer, leafy vegetables. Cut sugar and fried snacks.' },
  { keys: ['weight gain', 'muscle gain'], answer: 'Eat in surplus: paneer, eggs, chicken, peanut butter, bananas, and complex carbs like brown rice and oats.' },
  { keys: ['water', 'hydration'], answer: 'Aim for 2.5–3 litres of water per day. Add lemon or jeera water for variety.' }
]

export function askChatbot(req, res) {
  const msg = String(req.body.message || '').toLowerCase()
  const found = responses.find((r) => r.keys.some((k) => msg.includes(k)))
  res.json({
    answer: found?.answer || 'I can help with calories, meal timing, weight goals, and Indian diet ideas. Try asking about a specific food or goal.'
  })
}
