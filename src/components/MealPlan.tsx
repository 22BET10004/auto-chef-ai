import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Utensils, Flame, Apple, Dumbbell, Clock, Zap } from "lucide-react";

interface Meal {
  name: string;
  benefits: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
}

interface Workout {
  name: string;
  duration: string;
  calories: number;
  description: string;
  intensity: string;
}

interface MealPlanData {
  meals: Meal[];
  workouts?: Workout[];
  totalCalories: number;
  nutritionTips: string;
}

interface MealPlanProps {
  mealPlan: MealPlanData;
  targetCalories: number;
  onReset: () => void;
}

const MealPlan = ({ mealPlan, targetCalories, onReset }: MealPlanProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 rounded-2xl shadow-elevated">
        <h2 className="text-3xl font-bold mb-2">Your Personalized Meal Plan</h2>
        <div className="flex items-center gap-6 text-lg">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5" />
            <span>Target: {targetCalories} calories/day</span>
          </div>
          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            <span>{mealPlan.meals.length} meals</span>
          </div>
        </div>
      </div>

      {mealPlan.nutritionTips && (
        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-accent text-lg">
              <Apple className="h-5 w-5" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold text-lg">💡</span>
              <p className="text-sm text-foreground leading-relaxed">{mealPlan.nutritionTips}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealPlan.meals.map((meal, index) => (
          <Card key={index} className="hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="bg-gradient-to-br from-card to-secondary/10">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl">{meal.name}</CardTitle>
                <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">
                  {meal.calories} cal
                </Badge>
              </div>
              {meal.benefits && meal.benefits.length > 0 && (
                <div className="space-y-1 mt-3">
                  {meal.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center p-2 bg-secondary rounded-lg">
                    <div className="font-semibold text-primary">{meal.protein}g</div>
                    <div className="text-xs text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center p-2 bg-secondary rounded-lg">
                    <div className="font-semibold text-primary">{meal.carbs}g</div>
                    <div className="text-xs text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center p-2 bg-secondary rounded-lg">
                    <div className="font-semibold text-primary">{meal.fats}g</div>
                    <div className="text-xs text-muted-foreground">Fats</div>
                  </div>
                </div>

                {meal.ingredients && meal.ingredients.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                      <span className="text-primary">🥘</span> Key Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {meal.ingredients.map((ingredient, i) => (
                        <Badge key={i} variant="outline" className="text-xs font-normal">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mealPlan.workouts && mealPlan.workouts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-secondary" />
            Recommended Workouts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealPlan.workouts.map((workout, index) => (
              <Card key={index} className="hover:shadow-elevated transition-all duration-300 border-secondary/20">
                <CardHeader className="bg-gradient-to-br from-secondary/10 to-secondary/5">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{workout.name}</CardTitle>
                    <Badge 
                      variant={workout.intensity === "high" ? "destructive" : workout.intensity === "moderate" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {workout.intensity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <p className="text-sm text-muted-foreground">{workout.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-secondary" />
                      <span>{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-accent" />
                      <span>~{workout.calories} cal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={onReset} size="lg">
          Create New Plan
        </Button>
      </div>
    </div>
  );
};

export default MealPlan;
