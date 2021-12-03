import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const GameNightSchema = new Schema({
  location: { type: String, required: true },
  name: { type: String, required: true },
  gameNightDate: { type: String, required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  pin: { type: String, unique: true, required: true },
  isCanceled: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true } })

GameNightSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
