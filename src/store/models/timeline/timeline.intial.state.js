import { ANIMATIONS_TYPES, SHAPE_TYPES } from "../../../utils/constants";
import { animation, Shape } from "../../../utils/schemas";

export default {
    timeStamps: [
        { time: 3000, duration: 1000, animationId: "FIRST_ANIMATION_ID" },
        { time: 3000, duration: 1000, animationId: "FIRST_ANIMATION_ID_5" }, // shape 4
        { time: 3000, duration: 1000, animationId: "FIRST_ANIMATION_ID_7" }, // shape 4 fade in
        { time: 3500, duration: 1000, animationId: "FIRST_ANIMATION_ID_SHAPE_2" }, // shape 2
        { time: 4000, duration: 1000, animationId: "FIRST_ANIMATION_ID_2" },
        { time: 4500, duration: 1000, animationId: "FIRST_ANIMATION_ID_6" }, // shape 4
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
        }),
        FIRST_ANIMATION_ID_5: animation({
          type: ANIMATIONS_TYPES.moveX,
          value: 700,
          prevValue: 300,
          duration: 1000,
          shapeId: "SHAPE4",
        }),
        FIRST_ANIMATION_ID_6: animation({
          type: ANIMATIONS_TYPES.moveX,
          value: 500,
          prevValue: 700,
          duration: 1000,
          shapeId: "SHAPE4",
        }),
        FIRST_ANIMATION_ID_7: animation({
          type: ANIMATIONS_TYPES.fadeIn,
          duration: 1000,
          shapeId: "SHAPE4",
        }),
      },
      currentTimeStamp: 0,
      requestAnimationFrameLastTimeStamp: 0,
      previousRequestAnimationFrameEndDate: 0,
      previousRequestAnimationID: undefined,
      timelineLength: 6500 + 1000, // the last timestamp's time + the last timestamp's duration
      shapes: [
        Shape({
          x: 100,
          y: 100,
          height: 30,
          width: 30,
          id: "SHAPE1",
          type: SHAPE_TYPES.BOX,
        }),
        Shape({
          x: 200,
          y: 200,
          height: 50,
          width: 30,
          id: "SHAPE2",
          type: SHAPE_TYPES.BOX,
        }),
        Shape({
          x: 400,
          y: 400,
          height: 50,
          width: 50,
          id: "SHAPE3",
          type: SHAPE_TYPES.BOX,
        }),
        Shape({
          x: 300,
          y: 300,
          height: 50,
          width: 50,
          id: "SHAPE4",
          opacity:0,
          type: SHAPE_TYPES.TEXT,
          content: "SOUFIAN ZAMEL",
        }),
      ],
}