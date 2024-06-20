import gameConfig from './gameConfig.mjs';

const {
  playField: { width: playFieldWidth, height: playFieldHeight },
  padding: playFieldOffsetLeft,
  infoFieldHeight: playFieldOffsetTop,
  avatar: { width: avatarWidth, height: avatarHeight },
  collectibleSprite: { width: collectibleSpriteWidth, height: collectibleSpriteHeight },
} = gameConfig;

const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
};

class Player {
  constructor({ x, y, score = 0, id }) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
    this.speed = 5;
    this.dir = null;
  }

  /**
   * Draws the player on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The drawing context.
   * @param {HTMLImageElement} image - The image to draw.
   */
  draw(ctx, image) {
    if (this.dir) {
      this.movePlayer(this.dir, this.speed);
    }

    const x = this.x + playFieldOffsetLeft;
    const y = this.y + playFieldOffsetTop;
    ctx.drawImage(image, x, y, avatarWidth, avatarHeight);
  }

  /**
   * Moves the player in the specified direction.
   * @param {string} dir - The direction to move.
   * @param {number} speed - The speed of movement.
   */
  movePlayer(dir, speed) {
    switch (dir) {
      case DIRECTIONS.UP:
        this.y = Math.max(this.y - speed, 0);
        break;
      case DIRECTIONS.DOWN:
        this.y = Math.min(this.y + speed, playFieldHeight - avatarHeight);
        break;
      case DIRECTIONS.RIGHT:
        this.x = Math.min(this.x + speed, playFieldWidth - avatarWidth);
        break;
      case DIRECTIONS.LEFT:
        this.x = Math.max(this.x - speed, 0);
        break;
    }
  }

  /**
   * Checks if the player collides with a collectible.
   * @param {Object} collectible - The collectible object.
   * @returns {boolean} - Whether a collision occurred.
   */
  collision(collectible) {
    const l1 = { x: this.x, y: this.y };
    const r1 = { x: this.x + avatarWidth, y: this.y + avatarHeight };
    const l2 = { x: collectible.x, y: collectible.y };
    const r2 = { x: collectible.x + collectibleSpriteWidth, y: collectible.y + collectibleSpriteHeight };

    return !(l1.x >= r2.x || l2.x >= r1.x || r1.y <= l2.y || r2.y <= l1.y);
  }

  /**
   * Calculates the player's rank based on scores.
   * @param {Array} players - The array of player objects.
   * @returns {string} - The player's rank as a string.
   */
  calculateRank(players) {
    const numOfPlayers = players.length;
    if (this.score === 0) {
      return `Rank: ${numOfPlayers} / ${numOfPlayers}`;
    }
    players.sort((playerA, playerB) => playerB.score - playerA.score);
    const rank = players.findIndex((player) => player.id === this.id) + 1;
    return `Rank: ${rank} / ${numOfPlayers}`;
  }
}

export default Player;
