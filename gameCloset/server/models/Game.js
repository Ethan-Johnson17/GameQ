import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const GameSchema = new Schema({
  name: { type: String, required: true },
  rules_url: { type: String },
  houseRules: { type: String, default: 'no rules added yet.' },
  id: { type: String },
  // NOTE will need to change id to ids if you want to search atlas api by id(ids)
  min_players: { type: Number },
  max_players: { type: Number },
  price: { type: String },
  min_playtime: { type: Number },
  max_playtime: { type: Number },
  image_url: { type: String },
  min_age: { type: Number },
  owned: { type: Boolean, default: false },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  atlasUrl: { type: String }

}, { timestamps: true, toJSON: { virtuals: true } })

GameSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
