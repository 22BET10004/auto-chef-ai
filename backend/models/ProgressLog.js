import mongoose from 'mongoose'

const ProgressLogSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    caloriesConsumed: Number,
    targetCalories: Number,
    weight: Number
  },
  { timestamps: true }
)

export default mongoose.models.ProgressLog || mongoose.model('ProgressLog', ProgressLogSchema)
