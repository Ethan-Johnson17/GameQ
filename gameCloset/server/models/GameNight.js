import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const GameNightSchema = new Schema({
  location: { type: String, default: 'TBD' },
  name: { type: String, required: true },
  gameNightDate: { type: Date }
})
