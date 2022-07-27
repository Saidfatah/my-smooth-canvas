
import { Shape } from '../../../../utils/schemas';
import {  AddNewShapeEffectArgs } from '../../../../utils/types';
import { Dispatch, RootState } from '../../../store.index';

  //[MIGHT_CONSIDER] if a shape is added at a certain time stamp 
  // fade it in at that time stamp
  const DEFAULT_POSITION_X = 100;
  const DEFAULT_POSITION_Y = 100;
  const DEFAULT_WIDTH= 100
  const DEFAULT_HEIGHT= 100
  const effect :Function =(
    dispatch: Dispatch,
    { type }: AddNewShapeEffectArgs,
    state: RootState
  ) => {
    const shapes = [...state.timeline.shapes]
    const newShape = new Shape({
      x: DEFAULT_POSITION_X,
      y: DEFAULT_POSITION_Y,
      height: DEFAULT_WIDTH,
      width: DEFAULT_HEIGHT,
      type: type,
      fill: '#fff',
      opacity: 1
    })
    shapes.push(newShape)
    dispatch.timeline.UPDATE_SHAPES(shapes)
  };
  
  export default effect