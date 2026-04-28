import mongoose from 'mongoose'

const DietPlanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetCalories: Number,
    bmi: Number,
    bmiStatus: String,
    meals: {
      breakfast: Object,
      lunch: Object,
      dinner: Object
    },
    workouts: [String],
    filters: [String]
  },
  { timestamps: true }
)

export default mongoose.models.DietPlan || mongoose.model('DietPlan', DietPlanSchema)
