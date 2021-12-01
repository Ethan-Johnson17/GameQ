import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PlayerSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  gameNightId: { type: Schema.Types.ObjectId, ref: 'GameNight', required: true },
  gameNightPin: { type: String },
  items: { type: String }
}, { timestamps: true, toJSON: { virtuals: true } })

PlayerSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

PlayerSchema.virtual('gameNight', {
  localField: 'gameNightId',
  foreignField: '_id',
  justOne: true,
  ref: 'GameNight'
})
