import { gridUnit, SNAP_THRESHEHOLD } from './constants';
import { shape, shapePose } from './schemas';

export const snapToGrid = (shape: shape, prevPose: shapePose) => {
  const prevXpose = prevPose.x;
  const prevYpose = prevPose.y;
  if (
    shoudPoseBeSnapped(shape.x, gridUnit) &&
    Math.abs(prevXpose - shape.x) > SNAP_THRESHEHOLD
  )
    shape.x = newSnapedPosition(shape.x, gridUnit);
  if (
    shoudPoseBeSnapped(shape.y, gridUnit) &&
    Math.abs(prevYpose - shape.y) > SNAP_THRESHEHOLD
  )
    shape.y = newSnapedPosition(shape.y, gridUnit);
};

export const newSnapedPosition = (currentPose: number, unit: number) =>
  Math.round(currentPose / unit) * unit;
export const shoudPoseBeSnapped = (pose: number, unit: number) => {
  const pu = pose / unit;
  return Math.round(pu) - pu <= SNAP_THRESHEHOLD;
};

const speedTracker = {
  elapsedtimeFromLastActiveMouseDrag: 0,
  lastYSpeed: 0,
  lastXSpeed: 0
};
export const calcSpeed = (dx: number, dy: number) => {
  const now = new Date().getDate();
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
