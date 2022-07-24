import initialState from './timeline.intial.state';
import executeAnimationForTimestamp from './effects/executeAnimationForTimestamp';
import executeTimeline from './effects/executeTimeline';
import addNewTimeStamp from './effects/addNewTimeStamp';
import updateShapesInComposing from './effects/updateShapesInComposing';

const timelineModule = {
  state: initialState,
  reducers: {
    // handle state changes with pure functions
    UPDATE_SHAPES: (state: any, { shapes }: any) => ({
      ...state,
      shapes: [...shapes]
    }),
    UPDATE_CURRENT_TIME_STAMP: (state: any, { currentTimeStamp }: any) => ({
      ...state,
      currentTimeStamp
    }),
    UPDATE_TIME_STAMPS: (state: any, { keyframes }: any) => ({
      ...state,
      keyframes: [...keyframes]
    }),
    UPDATE_TIMELINE_ANIMATIONS: (state: any, { animations }: any) => ({
      ...state,
      animations
    }),
    UPDATE_PREVIOUS_REQUEST_ANIMATION_ID: (
      state: any,
      previousRequestAnimationID: any
    ) => ({
      ...state,
      previousRequestAnimationID
    }),
    UPDATE_REQUEST_ANIMATION_FRAME_LAST_TIMESTAMP: (
      state: any,
      requestAnimationFrameLastTimeStamp: any
    ) => ({
      ...state,
      requestAnimationFrameLastTimeStamp
    }),
    UPDATE_PREVIOUS_REQUEST_ANIMATION_END_DATE: (
      state: any,
      previousRequestAnimationFrameEndDate: any
    ) => ({
      ...state,
      previousRequestAnimationFrameEndDate
    })
  },
  effects: (dispatch: any) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    executeAnimationForTimestamp: (args: any, state: any) =>
      executeAnimationForTimestamp(dispatch, args, state),
    exectueTimeline: (args: any, state: any) =>
      executeTimeline(dispatch, args, state),
    addNewTimeStamp: (args: any, state: any) =>
      addNewTimeStamp(dispatch, args, state),
    updateShapesInComposing: (args: any, state: any) =>
      updateShapesInComposing(dispatch, args, state)
  })
};
export default timelineModule;
