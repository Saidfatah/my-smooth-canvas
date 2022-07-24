import { CANVAS_MODES } from '../../../utils/types';

interface swicthCanvasModeArgType {
  newCanvasMode: CANVAS_MODES;
}
export default {
  state: {
    currentCanvasMode: CANVAS_MODES.IDLE
  },
  reducers: {
    UPDATE_CANVAS_MODE: (state: any, { currentCanvasMode }: any) => ({
      ...state,
      currentCanvasMode
    })
  },
  effects: (dispatch: any) => ({
    swicthCanvasMode: ({ newCanvasMode }: swicthCanvasModeArgType, _: any) => {
      dispatch.canvasMode.UPDATE_CANVAS_MODE({
        currentCanvasMode: newCanvasMode
      });
      if (newCanvasMode === CANVAS_MODES.PLAYING) {
        dispatch.timeline.exectueTimeline();
      }
    }
  })
};
