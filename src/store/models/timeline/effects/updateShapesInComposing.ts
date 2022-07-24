export default (
  dispatch: any,
  { shapeIndex, updateFunction }: any,
  state: any
) => {
  const shapes = [...state.timeline.shapes];
  const targetShape = shapes[shapeIndex];
  updateFunction(targetShape);
  dispatch.timeline.UPDATE_SHAPES({ shapes });
};
