// Dependencies
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { RootState } from "../store/store.index";
import { drawGrid, createGradiantBackground } from "../utils/canvasUtils";
import { WIDTH, HEIGHT } from "../utils/constants";
import { CANVAS_MODES } from "../utils/types";


const Background = ({currentCanvasMode}:StateProps) => {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if ( backgroundCanvasRef.current) {
      var ctx= backgroundCanvasRef.current.getContext("2d");
      if(ctx){
        ctx.moveTo(0, 0);
        createGradiantBackground(ctx, WIDTH, HEIGHT);
        if(currentCanvasMode === CANVAS_MODES.COMPOSING)
        drawGrid(ctx);
      }
    }
  }, [currentCanvasMode]);

  return (
    <canvas
      ref={backgroundCanvasRef}
      id="canvas"
      width={WIDTH}
      height={HEIGHT}
      style={{ background: "#fff", zIndex: -1 }}
    ></canvas>
  );
};

const mapState=(state:RootState)=>({
  currentCanvasMode: state.canvasMode.currentCanvasMode
})

type StateProps = ReturnType<typeof mapState>
export default connect(mapState)(Background);
