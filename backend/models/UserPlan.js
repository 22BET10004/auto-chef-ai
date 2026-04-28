import mongoose from 'mongoose'

const UserPlanSchema = new mongoose.Schema(
  {
    age: Number,
    weight: Number,
    height: Number,
    gender: String,
    activityLevel: String,
    goal: String,
    filters: [String],
    bmi: Number,
    bmiStatus: String,
    bmr: Number,
    targetCalories: Number,
    mealPlan: Object,
    workouts: Object
  },
  { timestamps: true }
)

export default mongoose.models.UserPlan || mongoose.model('UserPlan', UserPlanSchema)
