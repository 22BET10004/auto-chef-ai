// Mirror of backend helpers — kept here for client-side previews if needed.
export function calculateBMI(w, h) {
  const m = h / 100
  return m && w ? +(w / (m * m)).toFixed(1) : 0
}
export function bmiStatus(bmi) {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  return 'Overweight'
}
