import React from "react";
import { connect } from "react-redux";
import { CANVAS_MODES, ICONS_NAMES } from "../utils/types";
import Icon from "./Icon";


interface CanvasModeButtonTypes{
  title:any
  iconName:any
   onClick:any
}

const CanvasModeButton = ({ title, iconName, onClick }:CanvasModeButtonTypes) => (
  <button
    className="mr-2  flex shadow-md rounded-md"
    key={title}
    onClick={onClick}
  >
    {/* <span className="text-white font-thin">{title}</span> */}
    <Icon strokeWidth={1} size={12} name={iconName} />
  </button>
);

interface CanvasModesBarTypes{
  canvasMode :any
  swicthCanvasMode :any
}

const CanvasModesBar = ({ canvasMode, swicthCanvasMode }:CanvasModesBarTypes) => {
  let barContent = (
    <div className="flex">
      <CanvasModeButton
        title="Play"
        iconName={ICONS_NAMES.PLAY}
        onClick={() => {
          swicthCanvasMode({newCanvasMode:CANVAS_MODES.PLAYING});
        }}
      />

      <CanvasModeButton
        title="Edit"
        iconName={ICONS_NAMES.EDIT}
        onClick={() => {
          swicthCanvasMode({newCanvasMode:CANVAS_MODES.COMPOSING});
        }}
      />
    </div>
  );
  if (canvasMode === CANVAS_MODES.PLAYING)
    barContent = (
      <div className="flex">
        <CanvasModeButton
          title="Pause"
          iconName={ICONS_NAMES.PAUSE}
          onClick={() => {
            swicthCanvasMode({newCanvasMode:CANVAS_MODES.PAUSE});
          }}
        />
        <CanvasModeButton
          title="Stop"
          iconName={ICONS_NAMES.STOP}
          onClick={() => {
            swicthCanvasMode({newCanvasMode:CANVAS_MODES.IDLE});
          }}
        />
      </div>
    );
  if (canvasMode === CANVAS_MODES.COMPOSING)
    barContent = (
      <div className="flex">
        <CanvasModeButton
          title="Save"
          iconName={ICONS_NAMES.SUBMIT}
          onClick={() => {
            swicthCanvasMode({newCanvasMode:CANVAS_MODES.IDLE});
          }}
        />
        <CanvasModeButton
          title="Cancel"
          iconName={ICONS_NAMES.CANCEL}
          onClick={() => {
            swicthCanvasMode({newCanvasMode:CANVAS_MODES.IDLE});
          }}
        />
      </div>
    );
  return <div className=" p-2 w-full h-24 absolute inset-0">{barContent}</div>;
};

export default connect(
  (state:any)=>({currentCanvasMode:state.canvasMode.currentCanvasMode}),
  dispatch=>({swicthCanvasMode:dispatch.canvasMode.swicthCanvasMode}),

)(CanvasModesBar);
