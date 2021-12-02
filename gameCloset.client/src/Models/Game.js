export class Game {
  constructor(data) {
    this.name = data.name
    this.owned = data.owned || false
    this.accountId = data.accountId
    this.atlasUrl = data.url
    this.houseRules = data.houseRules
    this.rules_url = data.rules_url
    // we're gonna need two id's
    this.atlasGameId = data.atlasGameId || data.id
    this.id = data._id
    this.min_players = data.min_players
    this.max_players = data.max_players
    this.price = data.price
    this.min_playtime = data.min_playtime
    this.max_playtime = data.max_playtime
    this.image_url = data.image_url
    this.min_age = data.min_age
  }
}