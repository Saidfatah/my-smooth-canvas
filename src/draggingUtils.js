import { gridUnit } from "./utils";

export const snapToGrid = (shape, prevPose) => {
  const prevXpose = prevPose.x;
  const prevYpose = prevPose.y;
  if (
    shoudPoseBeSnapped(shape.x) &&
    Math.abs(prevXpose - shape.x) > SNAP_THRESHEHOLD
  )
    shape.x = Math.round(shape.x / gridUnit) * gridUnit;
  if (
    shoudPoseBeSnapped(shape.y) &&
    Math.abs(prevYpose - shape.y) > SNAP_THRESHEHOLD
  )
    shape.y = Math.round(shape.y / gridUnit) * gridUnit;
};

const SNAP_THRESHEHOLD = 0.2;
const shoudPoseBeSnapped = (pose) => {
  const pu = pose / gridUnit;
  return Math.round(pu) - pu <= SNAP_THRESHEHOLD;
};

export const MIN_SPEED_THRESHEHOLD = 10;
const speedTracker = {
  elapsedtimeFromLastActiveMouseDrag: 0,
  lastYSpeed: 0,
  lastXSpeed: 0
};
export const calcSpeed = (dx, dy) => {
  const now = new Date();
  const time = now - speedTracker.elapsedtimeFromLastActiveMouseDrag;

  let xSpeed = Math.abs((dx / time) * 1000);
  let ySpeed = Math.abs((dy / time) * 1000);
  xSpeed = Math.abs(speedTracker.lastXSpeed - xSpeed) > 0.2 ? xSpeed : 0;
  ySpeed = Math.abs(speedTracker.lastYSpeed - ySpeed) > 0.2 ? ySpeed : 0;
  speedTracker.lastXSpeed = xSpeed;
  speedTracker.lastXSpeed = ySpeed;
  speedTracker.elapsedtimeFromLastActiveMouseDrag = now;
  return { ySpeed, xSpeed };
};
