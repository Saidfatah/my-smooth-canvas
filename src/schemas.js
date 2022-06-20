import { v4 } from "uuid";
/**
 * just acts as a Schema for creating Shapes
 */
export const Shape = (props) => {
  const { x, y, height, width } = props || {};
  return {
    x: x || 0,
    y: y || 0,
    id: v4(),
    width: width || 250,
    height: height || 50,
    fill: "#fff",
    isDragging: false
  };
};
