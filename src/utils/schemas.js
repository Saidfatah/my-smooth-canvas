import { v4 } from "uuid";
/**
 * just acts as a Schema for creating Shapes
 */
//[TODO] this should be a master class
// then have subclass such as , text, image 
export const Shape = (props) => {
  const { x, y, height, width,id,type,content,opacity } = props || {};
  return {
    x: x || 0,
    y: y || 0,
    id: id||v4(),
    width: width || 250,
    height: height || 50,
    fill: "#fff",
    isDragging: false,
    content:content || "",
    type,
    opacity:opacity || 1,
  };
};

// duration is calculated dynamicly
// for example if shape is at position at time-stamp-A
// and we move to an poisition at time-stamp-B
// the diff between the timestamps is the duration
// and we'll use this duration to calculate the value at any
// give time-stamp between time-stamp-A and time-stamp-B

// TODO
// consider seding animation as an object
export const animation = ({
  type,
  timeStamp,
  duration,
  shapeId,
  value,
  prevValue,
  isLastAnimation = false 
}) => {
  //const { type, timeStamp, duration, shapeId,value } = props || {};

  return {
    id: v4() || "ANIMATION_ID",
    shapeId,
    type,
    timeStamp,
    duration,
    value: value || 0, // for move animations
    prevValue: prevValue || 0 ,// for move animations
    isLastAnimation,
  };
};
