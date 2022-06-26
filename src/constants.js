export let WIDTH;
export let HEIGHT = window.innerHeight;
if (typeof window !== "undefined") {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
}

export const gridUnit = 10;

export const SNAP_THRESHEHOLD = 0.2;
export const MIN_SPEED_THRESHEHOLD = 10;
export const ONE_SECOND_WIDTH = 50;

export const ANIMATIONS_TYPES = {
  moveX: "MOVE_X",
  moveY: "MOVE_Y",
  fadeIn: "FADE_IN",
  fadeOut: "FADE_OUT",
  popIn: "POP_IN",
  popOut: "POP_OUT"
};

export const CANVAS_MODES_ENUM = {
  COMPOSING: "COMPOSING",
  IDLE: "IDLE",
  PLAYING: "PLAYING"
};

export const ICONS_NAMES = {
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  STOP: "STOP",
  EDIT: "EDIT",
  SUBMIT: "SUBMIT",
  CANCEL: "CANCEL"
};
