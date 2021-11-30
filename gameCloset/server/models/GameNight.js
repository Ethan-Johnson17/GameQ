import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const GameNightSchema = new Schema({
  location: { type: String, default: 'TBD' },
  name: { type: String, required: true },
  gameNightDate: { type: Date, default: 'TBD' },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

GameNightSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
