import React from "react";
import { ICONS_NAMES } from "./constants";

const SvgContainer = ({ classes, size, strokeWidth, children: paths }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={"text-white flex-shrink-0 " + (classes || "h-6 w-6")}
    fill="none"
    viewBox={"0 0 24 24"}
    stroke="currentColor"
    strokeWidth={strokeWidth || 2}
  >
    {paths}
  </svg>
);
const Icon = ({ name, size, strokeWidth, classes }) => {
  let icon;
  if (!ICONS_NAMES[name]) return undefined;
  if (name === ICONS_NAMES.CANCEL)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} size={size} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.PLAY)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} size={size} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.PAUSE)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} size={size} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.EDIT)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} size={size} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.STOP)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} size={size} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.SUBMIT)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} size={size} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </SvgContainer>
    );

  return icon;
};

export default Icon;
