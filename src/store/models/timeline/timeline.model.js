import initialState from './timeline.intial.state'
import executeAnimationForTimestamp from './effects/executeAnimationForTimestamp'
import executeTimeline from './effects/executeTimeline'
import addNewTimeStamp from './effects/addNewTimeStamp'
import updateShapesInComposing from './effects/updateShapesInComposing'

export default {
  state:initialState, 
  reducers: {
    // handle state changes with pure functions
    UPDATE_SHAPES: (state, { shapes }) => ({
      ...state,
      shapes: [...shapes],
    }),
    UPDATE_CURRENT_TIME_STAMP: (state, { currentTimeStamp }) => ({
      ...state,
      currentTimeStamp,
    }),
    UPDATE_TIME_STAMPS: (state, { keyframes }) => ({
      ...state,
      keyframes:[...keyframes],
    }),
    UPDATE_TIMELINE_ANIMATIONS: (state, { animations }) => ({
      ...state,
      animations,
    }),
    UPDATE_PREVIOUS_REQUEST_ANIMATION_ID: (state,  previousRequestAnimationID ) => ({
      ...state,
      previousRequestAnimationID,
    }),
    UPDATE_REQUEST_ANIMATION_FRAME_LAST_TIMESTAMP: (state,  requestAnimationFrameLastTimeStamp ) => ({
      ...state,
      requestAnimationFrameLastTimeStamp,
    }),
    UPDATE_PREVIOUS_REQUEST_ANIMATION_END_DATE: (state, previousRequestAnimationFrameEndDate ) => ({
      ...state,
      previousRequestAnimationFrameEndDate,
    }),
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    executeAnimationForTimestamp:(args,state)=> executeAnimationForTimestamp(dispatch,args,state),
    exectueTimeline: (args,state)=> executeTimeline(dispatch,args,state),
    addNewTimeStamp: (args,state)=> addNewTimeStamp(dispatch,args,state),
    updateShapesInComposing: (args,state)=> updateShapesInComposing(dispatch,args,state),
  }),
};
