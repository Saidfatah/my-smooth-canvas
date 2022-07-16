import { CANVAS_MODES_ENUM } from "../../../utils/constants";

export default {
  state: {
    currentCanvasMode: CANVAS_MODES_ENUM.IDLE,
  },
  reducers: {
    UPDATE_CANVAS_MODE: (state, { currentCanvasMode }) => ({
      ...state,
      currentCanvasMode,
    }),
  },
  effects: (dispatch) => ({
    swicthCanvasMode: ({ newCanvasMode }, state) => {
        dispatch.canvasMode.UPDATE_CANVAS_MODE({currentCanvasMode:newCanvasMode})
        if(newCanvasMode === CANVAS_MODES_ENUM.PLAYING){
          dispatch.timeline.exectueTimeline()
        }
    },
  }),
};
