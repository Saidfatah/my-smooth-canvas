import { createModel } from '@rematch/core';
import { CANVAS_MODES } from '../../../utils/types';
import { RootModel } from '../models.index';

interface swicthCanvasModeArgType {
  newCanvasMode: CANVAS_MODES;
}
interface CanvasModeModelType {
  currentCanvasMode: CANVAS_MODES;
}

const canvasModeModel= createModel<RootModel>()( {
  state: {
    currentCanvasMode: CANVAS_MODES.IDLE
  } as CanvasModeModelType,
  reducers: {
    UPDATE_CANVAS_MODE: (state, { currentCanvasMode }: any) => ({
      ...state,
      currentCanvasMode
    })
  },
  effects: (dispatch: any) => ({
    swicthCanvasMode: ({ newCanvasMode }: swicthCanvasModeArgType, _) => {
      dispatch.canvasMode.UPDATE_CANVAS_MODE({
        currentCanvasMode: newCanvasMode
      });
      if (newCanvasMode === CANVAS_MODES.PLAYING) {
        dispatch.timeline.exectueTimeline();
      }
    }
  })
});

export default canvasModeModel