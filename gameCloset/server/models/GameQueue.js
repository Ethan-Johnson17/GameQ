import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const GameQueueSchema = new Schema({
  gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  gameNightId: { type: Schema.Types.ObjectId, ref: 'GameNight', required: true },
  votes: { type: Array, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

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
