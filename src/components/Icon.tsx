import React, { ReactNode } from 'react';
import { ICONS_NAMES } from '../utils/types';

type SvgContainerTypes = {
  classes: string;
  strokeWidth: number;
  children: ReactNode;
};
const SvgContainer = ({
  classes,
  strokeWidth,
  children: paths
}: SvgContainerTypes) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={'text-white flex-shrink-0 ' + (classes || 'h-6 w-6')}
    fill="none"
    viewBox={'0 0 24 24'}
    stroke="currentColor"
    strokeWidth={strokeWidth || 2}
  >
    {paths}
  </svg>
);

type iconTypes = {
  name: ICONS_NAMES;
  size: number;
  strokeWidth: number;
  classes?: string;
};
const Icon = ({ name, strokeWidth, classes = '' }: iconTypes) => {
  let icon;
  if (!ICONS_NAMES[name]) return <span></span>;
  if (name === ICONS_NAMES.CANCEL)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.ARROW)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.ELIPSE)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.SQUARE)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.TEXT)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} classes={classes}>
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M25.198,6.273c-0.014,0.23-0.045,0.389-0.087,0.467c-0.045,0.084-0.176,0.145-0.392,0.183    c-0.469,0.104-0.781-0.074-0.935-0.533C23.239,4.7,22.59,3.578,21.84,3.016c-1.041-0.773-2.862-1.161-5.469-1.161    c-1.054,0-1.633,0.115-1.734,0.343c-0.036,0.075-0.057,0.184-0.057,0.324v18.999c0,0.812,0.188,1.383,0.571,1.709    c0.382,0.32,1.069,0.731,2.201,0.999c0.483,0.103,0.97,0.2,1.034,0.239c0.46,0,0.504,1.057-0.376,1.057    c-0.025,0.016-10.375-0.008-10.375-0.008s-0.723-0.439-0.074-1.023c0.271-0.121,0.767-0.343,0.767-0.343s1.83-0.614,2.211-1.009    c0.434-0.445,0.648-1.164,0.648-2.154V2.521c0-0.369-0.229-0.585-0.687-0.647c-0.049-0.015-0.425-0.02-1.122-0.02    c-2.415,0-4.191,0.418-5.338,1.259C3.176,3.735,2.411,4.877,1.737,6.545C1.52,7.065,1.22,7.234,0.84,7.058    C0.408,6.957,0.251,6.719,0.363,6.353c0.445-1.374,0.668-3.31,0.668-5.814c0-0.292,0.387-0.586,1.163-0.533L23.56,0.064    c0.709-0.104,1.096,0.012,1.16,0.343C25.076,2.096,25.234,4.052,25.198,6.273z"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.PLUS)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} classes={classes}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.PLAY)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} classes={classes}>
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
      <SvgContainer strokeWidth={strokeWidth} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.EDIT)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
        />
      </SvgContainer>
    );
  if (name === ICONS_NAMES.STOP)
    icon = (
      <SvgContainer strokeWidth={strokeWidth} classes={classes}>
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
      <SvgContainer strokeWidth={strokeWidth} classes={classes}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </SvgContainer>
    );

  return <>{icon}</>;
};

export default Icon;
