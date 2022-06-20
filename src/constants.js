export let WIDTH;
export let HEIGHT = window.innerHeight;
if (typeof window !== "undefined") {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
}

export const gridUnit = 10;

export const SNAP_THRESHEHOLD = 0.2;
export const MIN_SPEED_THRESHEHOLD = 10;
