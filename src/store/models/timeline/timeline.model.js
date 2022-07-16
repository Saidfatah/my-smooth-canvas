import initialState from './timeline.intial.state'
import executeAnimationForTimestamp from './effects/executeAnimationForTimestamp'
import executeTimeline from './effects/executeTimeline'
// steps
// 1 - [Building timline bar] (should be built using html and react usestate a,d ref) use native elemnt and style it
//     - https://www.w3schools.com/howto/howto_js_rangeslider.asp
//     - bar with time stamps , use interval of 10 secons [......*...|..........|..........|..........]
//     - time indecators are going to be below [MAYBE_LATER]
//     - current time stamp indecator (acts as a slider)
//       - listen to mouse
//     - update current timestamp when moving time stamp indecator

// BETTER_DO
// calculate certaain shapes state at every specific timestamp
// pass that state to function that consums it and rerenders the canvas with the right corresponding rendered state
// use index to indiate current animation

// when adding a new time stamp update timelineLength to the last timestamps time

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
  }),
};
