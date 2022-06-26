import React from "react";
import { CANVAS_MODES_ENUM } from "./constants";
//modes : COMPOSING | IDLE | PLAYING
// by default we show the idle state
// if there are any animations recorded we default to playing state

// the state bar should be ontop
// COMPOSING : save
// -when save is clicked we transtion into IDLE mode
// idle : play || edit
// -when play is clicked we transition into PLAYING mode
// -when edit is clicked we transition into COMPOSING mode
// playing : pause || stop
// -when pause is clicked we stay in PLAYING_MODE but we stop executing the timline
// -when stop is clicked we transition into IDLE mode

//[TODO]
// sub modes for PLAYING : PLAY || PAUSE

const CanvasModeButton = () => {};
const CanvasModesBar = ({ canvasMode, setCanvasMode }) => {
  let barContent = (
    <div>
      <button
        key="Play"
        onClick={() => {
          setCanvasMode(CANVAS_MODES_ENUM.PLAYING);
        }}
      >
        Play
      </button>
      <button
        key="Edit"
        onClick={() => {
          setCanvasMode(CANVAS_MODES_ENUM.COMPOSING);
        }}
      >
        Edit
      </button>
    </div>
  );
  if (canvasMode === CANVAS_MODES_ENUM.PLAYING)
    barContent = (
      <div>
        <button
          key="Pause"
          onClick={() => {
            setCanvasMode(CANVAS_MODES_ENUM.PLAYING);
          }}
        >
          Pause
        </button>
        <button
          key="Stop"
          onClick={() => {
            setCanvasMode(CANVAS_MODES_ENUM.IDLE);
          }}
        >
          Stop
        </button>
      </div>
    );
  if (canvasMode === CANVAS_MODES_ENUM.COMPOSING)
    barContent = (
      <div>
        <button
          key="Save"
          onClick={() => {
            setCanvasMode(CANVAS_MODES_ENUM.IDLE);
          }}
        >
          Save
        </button>
      </div>
    );
  return (
    <div className="bg-transaprent w-full h-24 absolute inset-0">
      {barContent}
    </div>
  );
};

export default CanvasModesBar;
