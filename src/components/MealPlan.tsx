import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Utensils, Flame, Apple } from "lucide-react";

interface Meal {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
}

interface MealPlanData {
  meals: Meal[];
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
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <Apple className="h-5 w-5" />
              Nutrition Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{mealPlan.nutritionTips}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealPlan.meals.map((meal, index) => (
          <Card key={index} className="hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="bg-gradient-to-br from-card to-secondary/10">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{meal.name}</CardTitle>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {meal.calories} cal
                </Badge>
              </div>
              <CardDescription className="mt-2">{meal.description}</CardDescription>
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
                    <h4 className="font-semibold text-sm mb-2">Key Ingredients:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {meal.ingredients.slice(0, 5).map((ingredient, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={onReset} size="lg">
          Create New Meal Plan
        </Button>
      </div>
    </div>
  );
};

export default MealPlan;
