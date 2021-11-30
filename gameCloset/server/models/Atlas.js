import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AtlasSchema = new Schema({
  name: { type: String, required: true },
  rules_url: { type: URL, required: true },
  id: { type: String, ref: 'apiGameId', required: true },
  min_players: { type: Number, required: true },
  max_players: { type: Number, required: true },
  price: { type: String, required: true },
  min_playtime: { type: Number, required: true },
  max_playtime: { type: Number, required: true },
  image_url: { type: URL, required: true },
  min_age: { type: Number, required: true }

}, { timestamps: true, toJSON: { virtuals: true } })

AtlasSchema.virtual('apiGameId', {
  localField: 'id',
  foreignField: '_id',
  justOne: true,
  ref: 'apiGameId'
})
