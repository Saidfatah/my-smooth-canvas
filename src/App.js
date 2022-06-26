// Dependencies
import React, { useEffect, useRef, useState } from "react";
import { drawRectangle, clearCanvasArea } from "./canvasUtils";
import {
  WIDTH,
  HEIGHT,
  requestAnimationFrame,
  cancelAnimationFrame
} from "./constants";
import { calcSpeed, snapToGrid } from "./draggingUtils";
import { lerp, easeInOut } from "./utils";
import {
  MIN_SPEED_THRESHEHOLD,
  ANIMATIONS_TYPES,
  CANVAS_MODES_ENUM,
  shapes,
  timelineAnimations,
  timeStamps,
  SCENE_LENGTH
} from "./constants";
import Timeline from "./Timeline";
import Background from "./Background";
import ComposingPlayGround from "./ComposingPlayGround";
import CanvasModesBar from "./CanvasModesBar";
// Styles
import "./tailwind.output.css";

// steps
// 1 - [Building timline bar] (should be built using html and react usestate a,d ref) use native elemnt and style it
//     - https://www.w3schools.com/howto/howto_js_rangeslider.asp
//     - bar with time stamps , use interval of 10 secons [......*...|..........|..........|..........]
//     - time indecators are going to be below [MAYBE_LATER]
//     - current time stamp indecator (acts as a slider)
//       - listen to mouse
//     - update current timestamp when moving time stamp indecator

const App = () => {
  const [canvasMode, setCanvasMode] = useState(CANVAS_MODES_ENUM.IDLE);
  const timeIndicatorTimeStamp = useRef(undefined);

  // have play here
  return (
    <div className="min-h-screen bg-gray-500 relative">
      <CanvasModesBar {...{ setCanvasMode, canvasMode }} />
      <Timeline timeIndicatorTimeStamp={timeIndicatorTimeStamp} />
      <Background />
      <ComposingPlayGround
        {...{ setCanvasMode, canvasMode, timeIndicatorTimeStamp }}
      />
    </div>
  );
};

export default App;
