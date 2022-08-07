import React, { MouseEventHandler } from 'react'
import { ICONS_NAMES } from '../utils/types';
import Icon from "./Icon";

type IconButtonTypes={
    title:string
    iconClasses?:string
    iconName:ICONS_NAMES
    onClick:MouseEventHandler
  }
  
const IconButton = ({ title, iconName, onClick }:IconButtonTypes) => (
    <button
      style={{width:"fit-content"}}
      className="mr-2 flex shadow-md rounded-md"
      key={title}
      onClick={onClick}
    >
      {/* <span className="text-white font-thin">{title}</span> */}
      <Icon strokeWidth={1} classes="" size={12} name={iconName} />
    </button>
);
export default IconButton