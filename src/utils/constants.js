import { animation, Shape } from "./schemas";

export let WIDTH;
export let HEIGHT = window.innerHeight;
if (typeof window !== "undefined") {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
}
export const cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;
export const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
export const gridUnit = 10;

export const SNAP_THRESHEHOLD = 0.2;
export const MIN_SPEED_THRESHEHOLD = 10;
export const ONE_SECOND_WIDTH = 50;

export const SHAPE_TYPES = {
  BOX: "BOX",// has only a background or a border 
  ELIPSE: "ELIPSE",// has only a background or a border 
  TEXT:"TEXT"
};
export const ANIMATIONS_TYPES = {
  moveX: "MOVE_X",
  moveY: "MOVE_Y",
  fadeIn: "FADE_IN",
  fadeOut: "FADE_OUT",
  popIn: "POP_IN",
  popOut: "POP_OUT",
  scaleX: "SCALE_X",
  scaleY: "SCALE_Y",
};

export const CANVAS_MODES_ENUM = {
  COMPOSING: "COMPOSING",
  IDLE: "IDLE",
  PLAYING: "PLAYING",
  PAUSE: "PAUSE",
};

export const ICONS_NAMES = {
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  STOP: "STOP",
  EDIT: "EDIT",
  SUBMIT: "SUBMIT",
  CANCEL: "CANCEL"
};

// temporary constants
export const shapes = [Shape({ x: 100, y: 100, height: 30, width: 30 })];

export const timelineAnimations = {
  FIRST_ANIMATION_ID: animation({
    type: ANIMATIONS_TYPES.moveX,
    value: 200,
    prevValue: 100,
    duration: 1000,
    shapeId: shapes[0].id
  }),
  FIRST_ANIMATION_ID_2: animation({
    type: ANIMATIONS_TYPES.moveY,
    value: 200,
    prevValue: 100,
    duration: 1000,
    shapeId: shapes[0].id
  }),
  FIRST_ANIMATION_ID_3: animation({
    type: ANIMATIONS_TYPES.moveX,
    value: 100,
    prevValue: 200,
    duration: 1000,
    shapeId: shapes[0].id
  }),
  FIRST_ANIMATION_ID_4: animation({
    type: ANIMATIONS_TYPES.moveY,
    value: 100,
    prevValue: 200,
    duration: 1000,
    shapeId: shapes[0].id
  })
};
// these should ordered from the first to the last one
export const timeStamps = [
  { time: 3000, animationId: "FIRST_ANIMATION_ID" },
  { time: 4000, animationId: "FIRST_ANIMATION_ID_2" },
  { time: 5000, animationId: "FIRST_ANIMATION_ID_3" },
  { time: 6000, animationId: "FIRST_ANIMATION_ID_4" }
];

export const SCENE_LENGTH = 12 * 1000;
