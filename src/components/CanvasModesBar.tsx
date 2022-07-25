import React from "react";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../store/store.index";
import { CANVAS_MODES, ICONS_NAMES } from "../utils/types";
import Icon from "./Icon";


type CanvasModeButtonTypes={
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


const CanvasModesBar = ({ currentCanvasMode, swicthCanvasMode }:Props) => {
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
  if (currentCanvasMode === CANVAS_MODES.PLAYING)
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
  if (currentCanvasMode === CANVAS_MODES.COMPOSING)
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


const mapState= (state:RootState) => ({
  currentCanvasMode:state.canvasMode.currentCanvasMode
})
const mapDispatch =(dispatch:Dispatch) => ({
  swicthCanvasMode: dispatch.canvasMode.swicthCanvasMode,
})

type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>
type Props = StateProps & DispatchProps

export default connect(mapState,mapDispatch)(CanvasModesBar);
