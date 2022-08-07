import React from "react";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../store/store.index";
import { shape } from "../utils/schemas";
import { ANIMATIONS_TYPES } from "../utils/types";


const ShapeSettingModal = ({ addNewKeyframe,selectedShape }:Props) => {
  if(typeof selectedShape === "undefined" ) return null

  const {id} = selectedShape as shape
  const addPresetAnimationFrame=(animationType:ANIMATIONS_TYPES)=>(_:any)=>{
     // dispatch add animation frame 
     addNewKeyframe({
      shapeId:id,
      animationConfig:{
        type:animationType,
        value: animationType === ANIMATIONS_TYPES.fadeIn?1:0,
        prevValue: animationType === ANIMATIONS_TYPES.fadeIn?0:1
      }
    })
  }
  // const openBackgroundColorModal=(_:any)=>{
  //   console.log("openBackgroundColorModal")
  // }
  // const openStrokeColorModal=(_:any)=>{
  //   console.log("openStrokeColorModal")

  // }


  return <div >
     {/* <p>styles</p>
     <button onClick={openBackgroundColorModal} >Background color {fill}</button>
     <button onClick={openStrokeColorModal} >Stroke color</button> */}
     {/* <button onClick={openStrokeColorModal} >opacity</button> */}
     <p>preset animations</p>
     <button 
     className="bg-white mb-1 rounded-sm p-1 text-blue-900 "
     onClick={addPresetAnimationFrame(ANIMATIONS_TYPES.fadeIn)} >fadIn</button>
     <br/>
     <button 
     className="bg-white mb-1 rounded-sm p-1 text-blue-900 "
     onClick={addPresetAnimationFrame(ANIMATIONS_TYPES.fadeOut)} >fadOut</button>
     {/* <button onClick={addPresetAnimationFrame(ANIMATIONS_TYPES.popIn)} >popIn</button> */}
     {/* <button onClick={addPresetAnimationFrame(ANIMATIONS_TYPES.popOut)} >popOut</button> */}
  </div>;
};


const mapState= (state:RootState) => ({
  selectedShape:state.timeline.selectedShape
})
const mapDispatch =(dispatch:Dispatch) => ({
  addNewKeyframe: dispatch.timeline.addNewKeyframe,
})

type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>
type Props = StateProps & DispatchProps

export default connect(mapState,mapDispatch)(ShapeSettingModal);
