import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface UserProfile {
  age: number;
  weight: number;
  height: number;
  gender: "male" | "female" | "other";
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active";
  goal: "lose" | "maintain" | "gain";
  dietType: "vegetarian" | "non-vegetarian" | "vegan" | "eggetarian";
  dietaryPreferences: string;
  mealsPerDay: number;
}

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile, calories: number) => void;
}

const UserProfileForm = ({ onSubmit }: UserProfileFormProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 170,
    gender: "male",
    activityLevel: "moderate",
    goal: "maintain",
    dietType: "vegetarian",
    dietaryPreferences: "",
    mealsPerDay: 3,
  });

  const calculateCalories = () => {
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (profile.gender === "male") {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    } else {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    }

    // Apply activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    };

    let tdee = bmr * activityMultipliers[profile.activityLevel];

    // Adjust for goal
    if (profile.goal === "lose") {
      tdee -= 500; // 500 calorie deficit for weight loss
    } else if (profile.goal === "gain") {
      tdee += 500; // 500 calorie surplus for weight gain
    }

    return Math.round(tdee);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calories = calculateCalories();
    onSubmit(profile, calories);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elevated">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardTitle className="text-2xl">Tell Us About Yourself</CardTitle>
        <CardDescription>
          We'll calculate your personalized calorie needs and create a custom meal plan
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                required
                min="10"
                max="120"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={profile.gender} onValueChange={(value: any) => setProfile({ ...profile, gender: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) })}
                required
                min="30"
                max="300"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: parseFloat(e.target.value) })}
                required
                min="100"
                max="250"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={profile.activityLevel} onValueChange={(value: any) => setProfile({ ...profile, activityLevel: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very Active (intense exercise daily)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Goal</Label>
              <Select value={profile.goal} onValueChange={(value: any) => setProfile({ ...profile, goal: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diet-type">Diet Type</Label>
              <Select value={profile.dietType} onValueChange={(value: any) => setProfile({ ...profile, dietType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian (शाकाहारी)</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian (मांसाहारी)</SelectItem>
                  <SelectItem value="eggetarian">Eggetarian (अंडाहारी)</SelectItem>
                  <SelectItem value="vegan">Vegan (पूर्ण शाकाहारी)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meals">Meals Per Day</Label>
              <Select 
                value={profile.mealsPerDay.toString()} 
                onValueChange={(value) => setProfile({ ...profile, mealsPerDay: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Meals</SelectItem>
                  <SelectItem value="3">3 Meals</SelectItem>
                  <SelectItem value="4">4 Meals</SelectItem>
                  <SelectItem value="5">5 Meals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dietary">Additional Preferences (Optional)</Label>
            <Textarea
              id="dietary"
              placeholder="e.g., no onion-garlic, jain food, allergies, regional preferences (North/South Indian), food dislikes..."
              value={profile.dietaryPreferences}
              onChange={(e) => setProfile({ ...profile, dietaryPreferences: e.target.value })}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Generate My Meal Plan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;
