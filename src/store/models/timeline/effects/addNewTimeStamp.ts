import {
  animation,
  Animation,
  keyframe,
  Keyframe
} from '../../../../utils/schemas';

const TIMESTAMP_OFFSET = 1000 / 10; // ms

//TO_DO
// when updating a time stamps time the previous timeStapm's should be updated
// when adding a new time stamp update timelineLength to the last timestamps time
//NOTE
//when I mention shape in this file I'm talking baout the shape that the users just modified
//and we want to create a keyframe and an animation for it

interface Animations {
  [key: string]: animation;
}

export default (
  dispatch: any,
  { shapeId, animationConfig }: any,
  state: any
) => {
  const currentTimeStamp: number = state.timeline.currentTimeStamp;
  const keyframes: Array<keyframe> = [...state.timeline.keyframes];
  const animations: Animations = { ...state.timeline.animations };
  const timeStampsLength = keyframes.length;
  const { type: animationType, value, previousValue } = animationConfig;

  // now becasue we are superfixing every animation ID with the shapeId and animationType
  // we can add that as an other condition to the fiter
  const shapeLastKeyframes = keyframes.filter(
    ({ animationId }) =>
      animationId.indexOf(shapeId) > -1 &&
      animationId.indexOf(animationType) > -1
  );

  const shapeLastTimeStamp = shapeLastKeyframes[shapeLastKeyframes.length - 1];

  let existingKeyframeOnTimestampForSameShapeAndAnimation: keyframe =
    new Keyframe({ time: 0, duration: 0, animationId: 'NO_DEFINED' });

  keyframes.forEach((keyframe) => {
    const { animationId } = keyframe;
    if (shapeLastTimeStamp) {
      const {
        time: shapeLastKeyframeTime,
        duration: shapeLastKeyframeDuration
      } = shapeLastTimeStamp;
      const shapeLastKeyframeEndOfExecutionTimestamp =
        shapeLastKeyframeTime + shapeLastKeyframeDuration;
      if (
        currentTimeStamp <
          shapeLastKeyframeEndOfExecutionTimestamp + TIMESTAMP_OFFSET &&
        currentTimeStamp >
          shapeLastKeyframeEndOfExecutionTimestamp - TIMESTAMP_OFFSET &&
        animationId.indexOf('_' + shapeId) > -1 &&
        animationId.indexOf('_' + animationType) > -1
      ) {
        existingKeyframeOnTimestampForSameShapeAndAnimation = keyframe;
      }
    }
  });

  if (
    existingKeyframeOnTimestampForSameShapeAndAnimation &&
    existingKeyframeOnTimestampForSameShapeAndAnimation.animationId !==
      'NO_DEFINED'
  ) {
    // just update the keyframe's corresponding animations
    console.log(existingKeyframeOnTimestampForSameShapeAndAnimation);
    animations[
      existingKeyframeOnTimestampForSameShapeAndAnimation?.animationId
    ].value = value;
    animations[
      existingKeyframeOnTimestampForSameShapeAndAnimation.animationId
    ].prevValue = previousValue;
    dispatch.timeline.UPDATE_TIMELINE_ANIMATIONS({
      animations
    });
    return;
  }

  if (currentTimeStamp > 50) {
    const newTimeStamp = shapeLastTimeStamp
      ? shapeLastTimeStamp.time + shapeLastTimeStamp.duration
      : 10;
    // if there is no previous keyframe for same type of animation for same shape
    // duration is currentTimeStamp it selff
    const duration = currentTimeStamp - newTimeStamp;
    const newTimeLineAnimation = new Animation({
      shapeId,
      type: animationType,
      duration,
      value,
      prevValue: previousValue
    });
    const timeLineAnimationIDSuperFixed =
      newTimeLineAnimation.id +
      '_' +
      timeStampsLength +
      '_' +
      shapeId +
      '_' +
      animationType;
    const newTimeSTamp = new Keyframe({
      time: newTimeStamp,
      animationId: timeLineAnimationIDSuperFixed,
      duration
    });
    keyframes.push(newTimeSTamp);
    animations[timeLineAnimationIDSuperFixed] = newTimeLineAnimation;
    dispatch.timeline.UPDATE_TIME_STAMPS({ keyframes });
    dispatch.timeline.UPDATE_TIMELINE_ANIMATIONS({ animations });
  }
};
