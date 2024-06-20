const players = [];

/**
 * Adds a new player to the players array.
 * @param {Object} player - The player object to add.
 * @returns {Object} The added player.
 */
function playerJoin(player) {
  players.push(player);
  return player;
}

/**
 * Updates the state of an existing player.
 * @param {Object} state - The new state of the player.
 * @param {number} state.x - The new x-coordinate of the player.
 * @param {number} state.y - The new y-coordinate of the player.
 * @param {string} state.id - The ID of the player.
 * @param {string} [state.dir] - The new direction of the player.
 * @param {number} [state.score] - The new score of the player.
 * @returns {Object|null} The updated player or null if player not found.
 */
function setPlayerState({ x, y, id, dir, score }) {
  const player = players.find((p) => p.id === id);
  if (player) {
    player.x = x;
    player.y = y;
    if (dir !== undefined) player.dir = dir;
    if (score !== undefined) player.score = score;
    return player;
  }
  return null; // Return null if player is not found
}

/**
 * Removes a player from the players array.
 * @param {string} id - The ID of the player to remove.
 * @returns {Object|null} The removed player or null if player not found.
 */
function playerLeave(id) {
  const playerIndex = players.findIndex((player) => player.id === id);
  if (playerIndex !== -1) {
    return players.splice(playerIndex, 1)[0];
  }
  return null; // Return null if player is not found
}

/**
 * Returns the array of players.
 * @returns {Array} The array of players.
 */
function getPlayers() {
  return players;
}

module.exports = {
  playerJoin,
  setPlayerState,
  playerLeave,
  getPlayers,
};
