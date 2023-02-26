import React, { Fragment, ReactNode } from 'react';
import Fade from 'react-reveal/Fade';

export const DEFAULT_TEST_ID = 'grid-container';
const DEFAULT_FADE_DURATION = 150;

type GridContainerProps = {
  children: ReactNode[],
  testId?: string,
}

const GridContainer = ({
  children,
  testId = DEFAULT_TEST_ID,
}: GridContainerProps) => {

  return (
    <div className="flex flex-row w-full p-8 -ml-10 -mt-10 flex-wrap justify-center align-middle" data-testid={`${testId}`}>
      {children}
    </div>
  )
};

export default GridContainer;
