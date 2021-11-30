import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const GameSchema = new Schema({
  name: { type: String, required: true },
  rules_url: { type: String, required: true },
  houseRules: { type: String, default: 'no rules added yet.' },
  // id: { type: String, ref: 'apiGameId', required: true },
  // NOTE will need to change id to ids if you want to search atlas api by id(ids)
  min_players: { type: Number, required: true },
  max_players: { type: Number, required: true },
  price: { type: String, required: true },
  min_playtime: { type: Number, required: true },
  max_playtime: { type: Number, required: true },
  image_url: { type: String, required: true },
  min_age: { type: Number, required: true },
  owned: { type: Boolean, default: false },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  url: { type: String }

}, { timestamps: true, toJSON: { virtuals: true } })

GameSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
