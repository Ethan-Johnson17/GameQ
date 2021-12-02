import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const GameNightSchema = new Schema({
  location: { type: String, default: 'TBD' },
  name: { type: String, required: true },
  gameNightDate: { type: Date },
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

export function gameCode() {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(5)
  return timestamp + 'xxxxx'.replace(/[x]/g, () => (
    Math.random() * 5 | 0).toString(5)).toLowerCase()
}
// TODO integrate this with game night
