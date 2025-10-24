import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { calories, dietaryPreferences, mealsPerDay, dietType, activityLevel, goal } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const dietTypeText = dietType === "vegetarian" ? "Pure vegetarian (no meat, fish, eggs)" :
                         dietType === "non-vegetarian" ? "Non-vegetarian (includes meat, fish, eggs)" :
                         dietType === "eggetarian" ? "Eggetarian (vegetarian + eggs allowed)" :
                         "Vegan (no animal products)";

    const systemPrompt = `You are a professional Indian nutritionist AI specializing in traditional and modern Indian cuisine. Generate personalized meal recommendations based on the user's calorie target and dietary preferences.
    
    CRITICAL: Generate ONLY authentic Indian meals using Indian ingredients, spices, and cooking methods.
    CRITICAL: You MUST return "benefits" as an array, NOT "description" as a string.
    
    Diet Type: ${dietTypeText}
    Provide ${mealsPerDay} Indian meals that total approximately ${calories} calories per day.
    Additional preferences: ${dietaryPreferences || "none specified"}
    
    For each meal:
    - Name: Indian dish name in English
    - Benefits: Array of 3-4 SHORT, PUNCHY points (max 10 words each) explaining health benefits
    - Calories: number
    - Macros: protein, carbs, fats (grams)
    - Ingredients: Top 5 ESSENTIAL ingredients only (no measurements)
    
    Workout recommendations based on:
    - Activity: ${activityLevel} | Goal: ${goal === "lose" ? "weight loss" : goal === "gain" ? "muscle gain" : "maintenance"} | Calories: ${calories}
    
    RETURN ONLY THIS EXACT JSON STRUCTURE (no markdown, no extra text):
    {
      "meals": [
        {
          "name": "Dish Name",
          "benefits": ["Short benefit point 1", "Short benefit point 2", "Short benefit point 3"],
          "calories": 450,
          "protein": 25,
          "carbs": 40,
          "fats": 15,
          "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3", "Ingredient 4", "Ingredient 5"]
        }
      ],
      "workouts": [
        {
          "name": "Exercise Name",
          "duration": "30 minutes",
          "calories": 200,
          "description": "One-line exercise description",
          "intensity": "moderate"
        }
      ],
      "totalCalories": ${calories},
      "nutritionTips": "One practical Indian nutrition tip (max 30 words)"
    }`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate a meal plan for ${calories} calories with ${mealsPerDay} meals per day.` }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error("Failed to generate meal recommendations");
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // Remove markdown code blocks if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse the JSON response from the AI
    const mealPlan = JSON.parse(content);

    return new Response(
      JSON.stringify(mealPlan),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in meal-recommendations function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
