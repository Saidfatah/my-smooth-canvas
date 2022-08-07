import { ANIMATIONS_TYPES, SHAPE_TYPES,Animations } from '../../../utils/types';
import {
  Animation,
  keyframe,
  Keyframe,
  shape,
  Shape
} from '../../../utils/schemas';


export interface TimelineStateType {
  keyframes: Array<keyframe>;
  animations: Animations;
  shapes: Array<shape>;
  currentTimeStamp: number;
  requestAnimationFrameLastTimeStamp: number;
  previousRequestAnimationFrameEndDate: number;
  previousRequestAnimationID: number;
  timelineLength: number;
  selectedShape: shape | undefined;
}
const intialState: TimelineStateType = {
  keyframes: [
    new Keyframe({
      time: 0,
      duration: 10,
      animationId: 'SHAPE_1_INIT'
    })
  ],
  animations: {
    SHAPE_1_INIT: new Animation({
      type: ANIMATIONS_TYPES.moveX,
      value: 100,
      prevValue: 100,
      duration: 10,
      shapeId: 'SHAPE1'
    })
  },
  currentTimeStamp: 0,
  requestAnimationFrameLastTimeStamp: 0,
  previousRequestAnimationFrameEndDate: 0,
  previousRequestAnimationID: -1,
  timelineLength: 6500 + 1000, // the last timestamp's time + the last timestamp's duration
  shapes: [
    new Shape({
      x: 100,
      y: 100,
      height: 30,
      width: 30,
      id: 'SHAPE_1',
      type: SHAPE_TYPES.BOX,
      fill: '#fff',
      opacity: 1
    })
  ],
  selectedShape:undefined
};

export default intialState;
