export let WIDTH: number;
export let HEIGHT: number;
export let cancelAnimationFrame: any;
export let requestAnimationFrame: any;
declare global {
  interface Window {
    requestAnimationFrame: any;
    mozCancelAnimationFrame: any;
    mozRequestAnimationFrame: any;
    webkitRequestAnimationFrame: any;
    msRequestAnimationFrame: any;
  }
}

if (typeof window !== 'undefined') {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  cancelAnimationFrame = window.mozCancelAnimationFrame;
  requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
}

export const gridUnit = 10;

export const SNAP_THRESHEHOLD = 0.2;
export const MIN_SPEED_THRESHEHOLD = 10;
export const ONE_SECOND_WIDTH = 50;
