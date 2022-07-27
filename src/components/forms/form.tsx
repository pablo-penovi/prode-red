import React, { FormEvent, ReactElement } from 'react';

const DEFAULT_TEST_ID = 'form';

type FormProps = {
  testId: string,
  method?: 'POST' |  'PUT',
  action?: string,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  onReset: (event: FormEvent<HTMLFormElement>) => void,
  isCard: boolean,
  children: ReactElement | ReactElement[]
}

const Form = ({
  testId,
  method,
  action,
  onSubmit,
  onReset,
  isCard,
  children
}: FormProps) => {

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <form
      data-testid={testId || DEFAULT_TEST_ID}
      method={method}
      action={action}
      onSubmit={onFormSubmit}
      onReset={onReset}
      className="flex align-middle justify-center w-full"
    >
      <div className={`${isCard ? 'bg-white text-gray-500 shadow-xl rounded-xl' : ''} p-10 pt-6 flex flex-col w-full max-w-md bg-opacity-70 backdrop-blur-lg`}>
        {children}
      </div>
    </form>
  );
};

export default Form;