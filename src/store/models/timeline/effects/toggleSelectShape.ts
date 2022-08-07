
import { ToggleSelectShapeEffectArgs } from '../../../../utils/types';
import { Dispatch, RootState } from '../../../store.index';
const effect :Function =(
  dispatch: Dispatch,
  { id,value }: ToggleSelectShapeEffectArgs,
  state: RootState
) => {
  console.log({id,value})
  //MIGHT_DO using shape index in the array might be better 
  const shapes = [...state.timeline.shapes]
  const targetShape = shapes.filter(shape=>shape.id === id )[0]
  if(targetShape){ 
    targetShape.isSelected= value
    dispatch.timeline.UPDATE_SHAPES(shapes)
    dispatch.timeline.UPDATE_SELECTED_SHAPE(targetShape)
  }
};
  
  export default effect