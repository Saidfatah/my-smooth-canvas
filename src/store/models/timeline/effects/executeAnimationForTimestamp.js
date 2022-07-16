import { ANIMATIONS_TYPES } from "../../../../utils/constants";
import { easeInOut, lerp } from "../../../../utils/utils";

export default (dispatch, { timestampValue }, state) => {
  const shapes = state.timeline.shapes;
  const timeStamps = [...state.timeline.timeStamps];
  if (!timeStamps.length) return;
  const targetTimeStamps = timeStamps.filter((timestamp) => {
    return (
      timestamp.time < timestampValue &&
      timestampValue < timestamp.time + timestamp.duration
    );
  });

  dispatch.timeline.UPDATE_CURRENT_TIME_STAMP({
    currentTimeStamp: timestampValue,
  });
  targetTimeStamps.forEach((timeStamp) => {
    // check if there is an animation linked to the time stamp
    const targetAnimation =
      state.timeline.timelineAnimations[timeStamp.animationId];
    // execute animation on targeted shape
    if (targetAnimation) {
      const indexOfTargetShape = shapes.findIndex(
        (shape) => shape.id === targetAnimation.shapeId
      );

      if (indexOfTargetShape > -1) {
        const type = targetAnimation.type;
        const duration = targetAnimation.duration;
        const elapsedTimeSinceAnimationStart = timestampValue - timeStamp.time;
        const value = targetAnimation.value;
        const prevValue = targetAnimation.prevValue;

        const calculatedValue = lerp(
          prevValue,
          value,
          easeInOut(elapsedTimeSinceAnimationStart / duration)
        );
        const hasntFinishedYet =
          prevValue > value
            ? calculatedValue >= value
            : calculatedValue <= value;

        switch (type) {
          case ANIMATIONS_TYPES.moveX:
            if (hasntFinishedYet)
              shapes[indexOfTargetShape].x = calculatedValue;
            break;
          case ANIMATIONS_TYPES.moveY:
            if (hasntFinishedYet)
              shapes[indexOfTargetShape].y = calculatedValue;
            break;
          case ANIMATIONS_TYPES.fadeIn:
            shapes[indexOfTargetShape].opacity = calculatedValue;
            break;
          case ANIMATIONS_TYPES.fadeOut:
            shapes[indexOfTargetShape].opacity = calculatedValue;
            break;

          default:
            break;
        }
        dispatch.timeline.UPDATE_SHAPES({ shapes });
      }
    }
  });
};
