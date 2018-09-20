class Game {
  constructor(player,top,left) {
      this.player = player;
      this.top = top;
      this.left = left;
  }

  hasFinished(finishLine) {
    return this.left >= finishLine;
  }

  isAlive(deathPoint) {
    return this.top < deathPoint;
  }

  increasePositionBy(what,value) {
    this[what] = this[what] + value;
  }
}
