import { v4 } from "uuid";
// line here
/**
 * draws a rectangle
 * @param {object} ctx the targeted canva's context.
 * @param {number} x the x position for the rect.
 * @param {number} y the y position for the rect.
 * @param {number} w the width of the rect.
 * @param {number} h the height of the rect.
 */
export const drawRectangle = (ctx, x, y, w, h) => {
  if (ctx.beginPath && ctx.rect && ctx.closePath && ctx.fill) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
  }
};

/**
 * clears the canvas
 * @param {object} ctx the targeted canva's context.
 * @param {number} width the targeted canva's width.
 * @param {number} height the targeted canva's height.
 */
export const clearCanvasArea = (ctx, width, height) => {
  if (ctx.clearRect) ctx.clearRect(0, 0, width, height);
};

/**
 * just acts as a Schema for creating Shapes
 */
export const Shape = (props) => {
  const { x, y, height, width } = props || {};
  return {
    x: x || 0,
    y: y || 0,
    id: v4(),
    width: width || 250,
    height: height || 50,
    fill: "#fff",
    isDragging: false
  };
};

export const drawGrid = function (ctx, unit = 8) {
  var data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> 
     <defs> 
      <pattern id="smallGrid" width="${unit}" height="${unit}" patternUnits="userSpaceOnUse"> 
          <path d="M ${unit} 0 L 0 0 0 ${unit}" fill="none" stroke="white" stroke-width="0.5" /> 
      </pattern> 
     </defs> 
     <rect width="100%" height="100%" fill="url(#smallGrid)" /> 
  </svg>`;

  var DOMURL = window.URL || window.webkitURL || window;

  var img = new Image();
  var svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  var url = DOMURL.createObjectURL(svg);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);
  };
  img.src = url;
};

export const createGradiantBackground = (ctx, WIDTH, HEIGHT) => {
  var grd = ctx.createLinearGradient(0, 0, 200, 0);
  const color1 = "#3d53c7";
  const color2 = "#5367d1";
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
};
