import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Hero from "@/components/Hero";
import UserProfileForm from "@/components/UserProfileForm";
import MealPlan from "@/components/MealPlan";
import { Loader2 } from "lucide-react";

interface MealPlanData {
  meals: Array<{
    name: string;
    description: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    ingredients: string[];
  }>;
  totalCalories: number;
  nutritionTips: string;
}

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlanData | null>(null);
  const [targetCalories, setTargetCalories] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("profile-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleProfileSubmit = async (profile: any, calories: number) => {
    setLoading(true);
    setTargetCalories(calories);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meal-recommendations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            calories,
            dietaryPreferences: profile.dietaryPreferences,
            mealsPerDay: profile.mealsPerDay,
            dietType: profile.dietType,
            activityLevel: profile.activityLevel,
            goal: profile.goal,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate meal plan");
      }

      const data = await response.json();
      setMealPlan(data);
      
      toast({
        title: "Success!",
        description: "Your personalized meal plan is ready.",
      });

      setTimeout(() => {
        document.getElementById("meal-plan")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error generating meal plan:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMealPlan(null);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("profile-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onGetStarted={handleGetStarted} />

      {showForm && !mealPlan && (
        <section id="profile-form" className="py-16 px-4">
          <UserProfileForm onSubmit={handleProfileSubmit} />
        </section>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
          <p className="text-xl text-muted-foreground">
            Creating your personalized meal plan...
          </p>
        </div>
      )}

      {mealPlan && !loading && (
        <section id="meal-plan" className="py-16 px-4">
          <MealPlan
            mealPlan={mealPlan}
            targetCalories={targetCalories}
            onReset={handleReset}
          />
        </section>
      )}
    </div>
  );
};

export default Index;
