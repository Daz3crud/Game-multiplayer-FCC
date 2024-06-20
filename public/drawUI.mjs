import gameConfig from './gameConfig.mjs';

const {
  title,
  controlInfo,
  gameWindowWidth,
  padding,
  infoFieldHeight,
  playField,
} = gameConfig;

/**
 * Draws the game UI on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The drawing context.
 * @param {string} playerRank - The player's rank to display.
 */
export default function drawUI(ctx, playerRank) {
  // Draw play field border
  ctx.beginPath();
  ctx.rect(padding, infoFieldHeight, playField.width, playField.height);
  ctx.strokeStyle = '#a8a8ac';
  ctx.stroke();
  ctx.closePath();

  const infoTextPosY = infoFieldHeight / 1.5;

  // Draw game control information
  drawText(ctx, controlInfo, padding, infoTextPosY, 'start', '13px', '#ffffff');

  // Draw game title
  drawText(ctx, title, gameWindowWidth / 2, infoTextPosY, 'center', '15px', '#ffffff');

  // Draw player's rank
  drawText(ctx, playerRank, gameWindowWidth - padding, infoTextPosY, 'end', '13px', '#ffffff');
}

/**
 * Draws text on the canvas with specified properties.
 * @param {CanvasRenderingContext2D} ctx - The drawing context.
 * @param {string} text - The text to draw.
 * @param {number} x - The x position.
 * @param {number} y - The y position.
 * @param {'start' | 'end' | 'center'} textAlign - The text alignment.
 * @param {string} fontSize - The font size.
 * @param {string} color - The text color.
 */
function drawText(ctx, text, x, y, textAlign, fontSize, color) {
  ctx.fillStyle = color;
  ctx.font = `${fontSize} 'Press Start 2P'`;
  ctx.textAlign = textAlign;
  ctx.fillText(text, x, y);
}
