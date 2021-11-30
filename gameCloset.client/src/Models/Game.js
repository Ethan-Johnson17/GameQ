export class Game {
  constructor(data) {
    this.name = data.name
    this.atlasUrl = data.url
    this.houseRules = data.houseRules
    this.rules_url = data.rules_url
    this.atlasGameId = data.id
    this.min_players = data.min_players
    this.max_players = data.max_players
    this.price = data.price
    this.min_playtime = data.min_playtime
    this.max_playtime = data.max_playtime
    this.image_url = data.image_url
    this.min_age = data.min_age
  }
}