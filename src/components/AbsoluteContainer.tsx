import React, { ReactNode } from 'react';

type AbsoluteContainerPpropsTypes = {
  children: ReactNode;
  left: number;
  top: number;
};
const AbsoluteContainer = ({
  children,
  left,
  top
}: AbsoluteContainerPpropsTypes) => {
  return (
    <div
      style={{
        top,  
        left
      }}
      className="mt-2 p-2 w-fit h-fit absolute"
    >
      {children}
    </div>
  );
};

export default AbsoluteContainer;
