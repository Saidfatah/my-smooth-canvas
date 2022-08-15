
import { UpdateShapeArgs } from '../../../../utils/types';
import { Dispatch, RootState } from '../../../store.index';
const effect :Function =(
  dispatch: Dispatch,
  { id,position }: UpdateShapeArgs,
  state: RootState
) => {
  //MIGHT_DO using shape index in the array might be better 
  const shapes = [...state.timeline.shapes]
  
  const targetShape = shapes.filter(shape=>shape.id === id )[0]
  if(targetShape){ 
    targetShape.x= position.x
    targetShape.y= position.y
    dispatch.timeline.UPDATE_SHAPES(shapes)
  }
};
  
  export default effect