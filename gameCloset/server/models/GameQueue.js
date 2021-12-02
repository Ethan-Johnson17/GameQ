import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const GameQueueSchema = new Schema({
  gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  gameNightId: { type: Schema.Types.ObjectId, ref: 'GameNight', required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  votes: [{ type: Schema.Types.ObjectId, required: true, default: [] }]
}, { timestamps: true, toJSON: { virtuals: true } })

GameQueueSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
GameQueueSchema.virtual('game', {
  localField: 'gameId',
  foreignField: '_id',
  justOne: true,
  ref: 'Game'
})
GameQueueSchema.virtual('gameNight', {
  localField: 'gameNightId',
  foreignField: '_id',
  justOne: true,
  ref: 'GameNight'
})
