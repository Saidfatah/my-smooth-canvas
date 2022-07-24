import { animation } from "./schemas";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export enum SHAPE_TYPES {
  BOX,
  TEXT,
  ELIPSE
}
export enum ANIMATIONS_TYPES {
  moveX="moveX",
  moveY="moveY",
  fadeIn="fadeIn",
  fadeOut="fadeOut",
  popIn="popIn",
  popOut="popOut",
  scaleX="scaleX",
  scaleY="scaleY"
}


export enum CANVAS_MODES {
  COMPOSING,
  IDLE,
  PLAYING,
  PAUSE
}

export enum ICONS_NAMES {
  PLAY,
  PAUSE,
  STOP,
  EDIT,
  SUBMIT,
  CANCEL
}

export interface Animations {
  [key: string]: animation;
}
export interface AddNewAnimationEffectArgs {
  shapeId:string;
  animationConfig: Omit<animation, 'duration'|'shapeId'|'id'>
}
