import React, { Fragment, ReactNode } from 'react';
import Header from './layout/header/header';

export const DEFAULT_TEST_ID = 'app-container';

type AppContainerProps = {
  testId?: string,
  children: ReactNode
}

const AppContainer = ({
  testId,
  children,
}: AppContainerProps) => {

  return (
    <Fragment>
      <Header />
      <div className={`flex flex-col align-middle justify-start min-h-screen p-10 text-theme-dark antialiased bg-gradient-to-br from-real-red-300 to-matt-blue-800`} data-testid={testId || DEFAULT_TEST_ID}>
        {children}
      </div>
    </Fragment>
  );
};

export default AppContainer;