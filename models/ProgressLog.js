import mongoose from 'mongoose'

const ProgressLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    caloriesConsumed: Number,
    waterMl: Number,
    weight: Number
  },
  { timestamps: true }
)

export default mongoose.models.ProgressLog || mongoose.model('ProgressLog', ProgressLogSchema)
