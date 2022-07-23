
export default (dispatch,{shapeIndex,updateFunction}, state) => {
    const shapes = [...state.timeline.shapes];
    const targetShape = shapes[shapeIndex]
    updateFunction(targetShape)
    dispatch.timeline.UPDATE_SHAPES({shapes})
}