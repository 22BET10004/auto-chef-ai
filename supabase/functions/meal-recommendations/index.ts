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
    const { calories, dietaryPreferences, mealsPerDay } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a professional nutritionist AI. Generate personalized meal recommendations based on the user's calorie target and dietary preferences. 
    
    Provide ${mealsPerDay} meals that total approximately ${calories} calories per day.
    
    For each meal, include:
    - Meal name (creative and appetizing)
    - Detailed description
    - Estimated calories
    - Macronutrients (protein, carbs, fats in grams)
    - Key ingredients list
    
    Consider these dietary preferences: ${dietaryPreferences || "none specified"}
    
    Return ONLY valid JSON in this exact format:
    {
      "meals": [
        {
          "name": "Meal Name",
          "description": "Detailed meal description",
          "calories": 450,
          "protein": 25,
          "carbs": 40,
          "fats": 15,
          "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"]
        }
      ],
      "totalCalories": ${calories},
      "nutritionTips": "Brief personalized nutrition tip"
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
