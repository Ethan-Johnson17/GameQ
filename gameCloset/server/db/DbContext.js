import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { AtlasSchema } from '../models/Atlas'
import { GameSchema } from '../models/Game'
import { GameNightSchema } from '../models/GameNight'
import { GameQueueSchema } from '../models/GameQueue'
import { PlayerSchema } from '../models/Player'
import { ValueSchema } from '../models/Value'

class DbContext {
  GameNight = mongoose.model('GameNight', GameNightSchema);
  GameQueue = mongoose.model('GameQueue', GameQueueSchema);
  Player = mongoose.model('Player', PlayerSchema);
  Game = mongoose.model('Game', GameSchema);
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Atlas = mongoose.model('Atlas', AtlasSchema);
}

export const dbContext = new DbContext()
