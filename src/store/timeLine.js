import { ANIMATIONS_TYPES } from "../constants";
import { animation, Shape } from "../schemas";



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
export default  {
    state:{
      timeStamps:[
        { time: 3000, animationId: "FIRST_ANIMATION_ID" },
        { time: 4000, animationId: "FIRST_ANIMATION_ID_2" },
        { time: 5000, animationId: "FIRST_ANIMATION_ID_3" },
        { time: 6000, animationId: "FIRST_ANIMATION_ID_4" }
      ],
      timelineAnimations:{
        FIRST_ANIMATION_ID: animation({
          type: ANIMATIONS_TYPES.moveX,
          value: 200,
          prevValue: 100,
          duration: 1000,
          shapeId: "SHAPE1"
        }),
        FIRST_ANIMATION_ID_2: animation({
          type: ANIMATIONS_TYPES.moveY,
          value: 200,
          prevValue: 100,
          duration: 1000,
          shapeId: "SHAPE1"
        }),
        FIRST_ANIMATION_ID_3: animation({
          type: ANIMATIONS_TYPES.moveX,
          value: 100,
          prevValue: 200,
          duration: 1000,
          shapeId: "SHAPE1"
        }),
        FIRST_ANIMATION_ID_4: animation({
          type: ANIMATIONS_TYPES.moveY,
          value: 100,
          prevValue: 200,
          duration: 1000,
          shapeId: "SHAPE1"
        })
      },
      shapes:[Shape({ x: 100, y: 100, height: 30, width: 30 ,id:"SHAPE1"})]
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      increment(state, payload) {
        return state + payload;
      },
    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
      async incrementAsync(payload, rootState) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch.count.increment(payload);
      },
    }),
};