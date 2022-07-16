import React from "react";
import { connect } from "react-redux";
import { CANVAS_MODES_ENUM, ICONS_NAMES } from "../utils/constants";
import Icon from "./Icon";

const CanvasModeButton = ({ title, iconName, onClick }) => (
  <button
    className="mr-2  flex shadow-md rounded-md"
    key={title}
    onClick={onClick}
  >
    {/* <span className="text-white font-thin">{title}</span> */}
    <Icon strokeWidth={1} size={12} name={iconName} />
  </button>
);

const CanvasModesBar = ({ canvasMode, swicthCanvasMode }) => {
  let barContent = (
    <div className="flex">
      <CanvasModeButton
        title="Play"
        iconName={ICONS_NAMES.PLAY}
        onClick={() => {
          swicthCanvasMode({newCanvasMode:CANVAS_MODES_ENUM.PLAYING});
        }}
      />

      <CanvasModeButton
        title="Edit"
        iconName={ICONS_NAMES.EDIT}
        onClick={() => {
          swicthCanvasMode({newCanvasMode:CANVAS_MODES_ENUM.COMPOSING});
        }}
      />
    </div>
  );
  if (canvasMode === CANVAS_MODES_ENUM.PLAYING)
    barContent = (
      <div className="flex">
        <CanvasModeButton
          title="Pause"
          iconName={ICONS_NAMES.PAUSE}
          onClick={() => {
            swicthCanvasMode({newCanvasMode:CANVAS_MODES_ENUM.PAUSE});
          }}
        />
        <CanvasModeButton
          title="Stop"
          iconName={ICONS_NAMES.STOP}
          onClick={() => {
            swicthCanvasMode({newCanvasMode:CANVAS_MODES_ENUM.IDLE});
          }}
        />
      </div>
    );
  if (canvasMode === CANVAS_MODES_ENUM.COMPOSING)
    barContent = (
      <div className="flex">
        <CanvasModeButton
          title="Save"
          iconName={ICONS_NAMES.SUBMIT}
          onClick={() => {
            swicthCanvasMode({newCanvasMode:CANVAS_MODES_ENUM.IDLE});
          }}
        />
        <CanvasModeButton
          title="Cancel"
          iconName={ICONS_NAMES.CANCEL}
          onClick={() => {
            swicthCanvasMode({newCanvasMode:CANVAS_MODES_ENUM.IDLE});
          }}
        />
      </div>
    );
  return <div className=" p-2 w-full h-24 absolute inset-0">{barContent}</div>;
};

export default connect(
  state=>({currentCanvasMode:state.canvasMode.currentCanvasMode}),
  dispatch=>({swicthCanvasMode:dispatch.canvasMode.swicthCanvasMode}),

)(CanvasModesBar);
