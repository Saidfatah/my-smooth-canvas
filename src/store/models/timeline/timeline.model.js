import {
  ANIMATIONS_TYPES,
  cancelAnimationFrame,
} from "../../../utils/constants";
import { animation, Shape } from "../../../utils/schemas";
import { easeInOut, lerp } from "../../../utils/utils";

// steps
// 1 - [Building timline bar] (should be built using html and react usestate a,d ref) use native elemnt and style it
//     - https://www.w3schools.com/howto/howto_js_rangeslider.asp
//     - bar with time stamps , use interval of 10 secons [......*...|..........|..........|..........]
//     - time indecators are going to be below [MAYBE_LATER]
//     - current time stamp indecator (acts as a slider)
//       - listen to mouse
//     - update current timestamp when moving time stamp indecator

// BETTER_DO
// calculate certaain shapes state at every specific timestamp
// pass that state to function that consums it and rerenders the canvas with the right corresponding rendered state
// use index to indiate current animation


// when adding a new time stamp update timelineLength to the last timestamps time 
export default {
  state: {
    timeStamps: [
      { time: 3000, duration: 1000, animationId: "FIRST_ANIMATION_ID" },
      { time: 3500, duration: 1000, animationId: "FIRST_ANIMATION_ID_SHAPE_2" },// shape 2
      { time: 4000, duration: 1000, animationId: "FIRST_ANIMATION_ID_2" },
      { time: 5000, duration: 1000, animationId: "FIRST_ANIMATION_ID_3" },
      { time: 6000, duration: 1000, animationId: "FIRST_ANIMATION_ID_4" },
      { time: 6500, duration: 1000, animationId: "FIRST_ANIMATION_ID_SHAPE_3" },
    ],
    timelineAnimations: {
      FIRST_ANIMATION_ID: animation({
        type: ANIMATIONS_TYPES.moveX,
        value: 200,
        prevValue: 100,
        duration: 1000,
        shapeId: "SHAPE1",
      }),
      FIRST_ANIMATION_ID_SHAPE_2: animation({
        type: ANIMATIONS_TYPES.moveX,
        value: 300,
        prevValue: 200,
        duration: 1000,
        shapeId: "SHAPE2",
      }),
      FIRST_ANIMATION_ID_SHAPE_3: animation({
        type: ANIMATIONS_TYPES.moveX,
        value: 100,
        prevValue: 400,
        duration: 1000,
        shapeId: "SHAPE3",
      }),
      FIRST_ANIMATION_ID_2: animation({
        type: ANIMATIONS_TYPES.moveY,
        value: 200,
        prevValue: 100,
        duration: 1000,
        shapeId: "SHAPE1",
      }),
      FIRST_ANIMATION_ID_3: animation({
        type: ANIMATIONS_TYPES.moveX,
        value: 100,
        prevValue: 200,
        duration: 1000,
        shapeId: "SHAPE1",
      }),
      FIRST_ANIMATION_ID_4: animation({
        type: ANIMATIONS_TYPES.moveY,
        value: 100,
        prevValue: 200,
        duration: 1000,
        shapeId: "SHAPE1",
        isLastAnimation: true,
      }),
    },
    currentTimeStamp:0,
    timelineLength:6500+1000,// the last timestamp's time + the last timestamp's duration
    shapes: [
      Shape({ x: 100, y: 100, height: 30, width: 30, id: "SHAPE1" }),
      Shape({ x: 200, y: 200, height: 50, width: 30, id: "SHAPE2" }),
      Shape({ x: 400, y: 400, height: 50, width: 50, id: "SHAPE3" }),
    ],
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    UPDATE_SHAPES: (state, { shapes }) => ({
      ...state,
      shapes: [...shapes],
    }),
    UPDATE_CURRENT_TIME_STAMP: (state, { currentTimeStamp }) => ({
      ...state,
      currentTimeStamp,
    }),
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    executeAnimationForTimestamp: (
      { timestampValue },
      state
    ) => {
      console.log({timestampValue})
      const shapes = state.timeline.shapes;
      const timeStamps = [...state.timeline.timeStamps];
      if (!timeStamps.length) return;
      const targetTimeStamps = timeStamps.filter((timestamp) => {
        return (
          timestamp.time < timestampValue &&
          timestampValue < timestamp.time + timestamp.duration
        );
      });

      dispatch.timeline.UPDATE_CURRENT_TIME_STAMP({currentTimeStamp:timestampValue})
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
            if (
              type === ANIMATIONS_TYPES.moveX ||
              type === ANIMATIONS_TYPES.moveY
            ) {
              const value = targetAnimation.value;
              const prevValue = targetAnimation.prevValue;
              const duration = targetAnimation.duration;
              const isLastAnimation = targetAnimation.isLastAnimation;
              const elapsedTimeSinceAnimationStart =
                timestampValue - timeStamp.time;
  
              let calculatedValue;
              calculatedValue = lerp(
                prevValue,
                value,
                easeInOut(elapsedTimeSinceAnimationStart / duration)
              );


              const hasntFinishedYet =
                prevValue > value
                  ? calculatedValue >= value
                  : calculatedValue <= value;

              if (hasntFinishedYet) {

                if (type === ANIMATIONS_TYPES.moveX)
                  shapes[indexOfTargetShape].x = calculatedValue;
                if (type === ANIMATIONS_TYPES.moveY)
                  shapes[indexOfTargetShape].y = calculatedValue;
              } else {
                //if (isLastAnimation) cancelAnimationFrame(requestAnimationID);
              }
              dispatch.timeline.UPDATE_SHAPES({ shapes });
            }
            //handleRefreshCallback(ctx);
          }
        }
      });
    },
  }),
};
