import React, { ReactElement } from 'react';
import Button from '../button';

const DEFAULT_TEST_ID = 'form-button-container';

type FormButtonContainerProps = {
  testId: string,
  children: ReactElement<typeof Button> | ReactElement<typeof Button>[]
}

const FormButtonContainer = ({
  testId,
  children
}: FormButtonContainerProps) => {

  return (
    <div 
      className="flex flex-row justify-center align-middle mt-6 w-full space-x-3"
      data-testid={testId || DEFAULT_TEST_ID}
    >
      {children}
    </div>
  );
};

export default FormButtonContainer;