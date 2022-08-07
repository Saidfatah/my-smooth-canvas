import { gridUnit, ONE_SECOND_WIDTH } from './constants';
import { shape } from './schemas';
import { SHAPE_TYPES, Omit } from './types';

export const drawText = (
  ctx: CanvasRenderingContext2D,
  shapeConfig: Omit<shape, 'type' | 'width' | 'height' | 'fill' | 'id'>
) => {
  const { x, y, opacity, content } = shapeConfig;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.font = '16px Arial';
  const opacityFloated = parseFloat(opacity.toFixed(4));
  ctx.fillStyle = `rgba(255, 255, 255, ${opacityFloated})`;
  ctx.strokeStyle = 'white';

  ctx.fillText(content, x, y);

  ctx.fill();
};

export const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  shapeConfig: Omit<shape, 'type' | 'fill' | 'id'>
) => {
  const { x, y, width, height,isSelected } = shapeConfig;

  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.closePath();
  ctx.fill();
  if(isSelected) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.setLineDash([2, 5]);
    ctx.stroke()
  }
};

export const drawShape = (ctx: CanvasRenderingContext2D, shape: shape) => {
  const { type, fill } = shape;
  ctx.fillStyle = fill;
  switch (type) {
    case SHAPE_TYPES.BOX:
      drawRectangle(ctx, shape);
      break;

    case SHAPE_TYPES.TEXT:
      drawText(ctx, shape);
      break;

    default:
      break;
  }
};

const SECOND_MARK_HEIGHT = 15;
const MILL_SECOND_MARK_HEIGHT = 20;
export const drawTimelineMarks = (ctx:CanvasRenderingContext2D) => {
  ctx.font = "12px Arial";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  for (let i = 0; i < 60; i++) {
    // draw seconds marks
    ctx.beginPath();
    const second_x = ONE_SECOND_WIDTH * i;
    ctx.moveTo(second_x, 25);
    ctx.lineTo(second_x, SECOND_MARK_HEIGHT);
    ctx.stroke();
    // draw millseconds marks
    for (let i = 0; i < 10; i++) {
      const mill_second_x = second_x + i * (ONE_SECOND_WIDTH / 10);
      ctx.beginPath();
      ctx.moveTo(mill_second_x, 25);
      ctx.lineTo(mill_second_x, MILL_SECOND_MARK_HEIGHT);
      ctx.stroke();
    }
    ctx.fillText(i + "s", second_x, SECOND_MARK_HEIGHT);
  }
};

export const drawCurrentTimeStampIndecator = (ctx:CanvasRenderingContext2D, xOffset:number, yOffset:number) => {
  // the triangle
  const length = 5;
  ctx.beginPath();
  ctx.moveTo(xOffset + length, yOffset);
  ctx.lineTo(xOffset + length * 3, yOffset);
  ctx.lineTo(xOffset + length * 3, yOffset + length * 3);
  ctx.lineTo(xOffset + length * 2, yOffset + length * 4);
  ctx.lineTo(xOffset + length, yOffset + length * 3);
  ctx.closePath();

  // the outline

  ctx.strokeStyle = "white";
  ctx.stroke();

  // the fill color
  ctx.fillStyle = "red";
  ctx.fill();
};

export const clearCanvasArea = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  if (ctx.clearRect) ctx.clearRect(0, 0, width, height);
};

export const drawGrid = function (ctx: CanvasRenderingContext2D) {
  var data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> 
     <defs> 
      <pattern id="smallGrid" width="${gridUnit}" height="${gridUnit}" patternUnits="userSpaceOnUse"> 
          <path d="M ${gridUnit} 0 L 0 0 0 ${gridUnit}" fill="none" stroke="white" stroke-width="0.5" /> 
      </pattern> 
     </defs> 
     <rect width="100%" height="100%" fill="url(#smallGrid)" /> 
  </svg>`;

  var DOMURL = window.URL || window.webkitURL || window;

  var img = new Image();
  var svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  var url = DOMURL.createObjectURL(svg);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);
  };
  img.src = url;
};

export const createGradiantBackground = (
  ctx: CanvasRenderingContext2D,
  WIDTH: number,
  HEIGHT: number
) => {
  var grd = ctx.createLinearGradient(0, 0, 200, 0);
  const color1 = '#3d53c7';
  const color2 = '#5367d1';
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
};
