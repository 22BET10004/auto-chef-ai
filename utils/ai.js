/**
 * utils/ai.js
 * Helper functions to build prompts or post-process AI output.
 * This file is intentionally minimal. Expand prompt engineering here.
 */

export function buildRecipePrompt(ingredients, options = {}) {
  const style = options.style || 'simple'
  return `You are an expert chef. Ingredients: ${ingredients}. Output a recipe with a short title, ingredients list, steps, time and serving size. Use ${style} style.`
}
