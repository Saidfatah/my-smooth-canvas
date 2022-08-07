import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../store/store.index';
import { CANVAS_MODES, ICONS_NAMES, SHAPE_TYPES } from '../utils/types';
import IconButton from './IconButton';

const shapesSideBar = ({ addNewShape, currentCanvasMode }: Props) => {
  if (currentCanvasMode === CANVAS_MODES.COMPOSING)
    return (
        <div className="flex flex-col">
          <IconButton
            title="Rectangle"
            iconName={ICONS_NAMES.SQUARE}
            onClick={() => {
              addNewShape({ type: SHAPE_TYPES.BOX });
            }}
          />
          <IconButton
            title="Elipise"
            iconName={ICONS_NAMES.ELIPSE}
            onClick={() => {
              addNewShape({ type: SHAPE_TYPES.ELIPSE });
            }}
          />
          <IconButton
            title="Text"
            iconName={ICONS_NAMES.TEXT}
            onClick={() => {
              addNewShape({ type: SHAPE_TYPES.TEXT });
            }}
          />
          <IconButton
            title="Arrow"
            iconName={ICONS_NAMES.ARROW}
            onClick={() => {
              addNewShape({ type: SHAPE_TYPES.ARROW });
            }}
          />
        </div>
    );

  return null;
};

const mapState = (state: RootState) => ({
  currentCanvasMode: state.canvasMode.currentCanvasMode
});
const mapDispatch = (dispatch: Dispatch) => ({
  addNewShape: dispatch.timeline.addNewShape
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps;

export default connect(mapState, mapDispatch)(shapesSideBar);
