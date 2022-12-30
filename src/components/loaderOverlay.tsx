import React from 'react';
import Spinner from './spinner';

export const DEFAULT_TEST_ID = 'loader-overlay';

type LoaderOverlayProps = {
  testId?: string,
}

const LoaderOverlay = ({
  testId,
}: LoaderOverlayProps) => {
  return (
    <span className={"flex flex-col items-center justify-center w-screen h-screen bg-white bg-opacity-50 backdrop-blur-lg"} data-testid={testId || DEFAULT_TEST_ID}>
      <Spinner testId={`${testId || DEFAULT_TEST_ID}-spinner`}/>
    </span>
  );
};

export default LoaderOverlay;