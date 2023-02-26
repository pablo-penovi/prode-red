import React, { MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const DEFAULT_TEST_ID = 'option-card';

type OptionCardProps = {
  icon: IconProp,
  caption: string,
  onClick: MouseEventHandler,
  disabled?: boolean,
  testId?: string,
}

const OptionCard = ({
  icon,
  caption,
  onClick,
  disabled = false,
  testId = DEFAULT_TEST_ID,
}: OptionCardProps) => {

  const getStyle = () => (
    disabled
      ? 'flex flex-col w-[13rem] h-[9rem] rounded-lg drop-shadow-lg justify-center align-middle mt-10 ml-14 p-4 bg-gray-500 cursor-pointer'
      : 'flex flex-col w-[13rem] h-[9rem] rounded-lg drop-shadow-lg justify-center align-middle mt-10 ml-14 p-4 bg-gray-50 cursor-pointer transform transition duration-200 hover:scale-105 hover:bg-red-200'
  )

  return (
    <div className={getStyle()} data-testid={`${testId}`}
      onClick={(event) => !disabled && onClick(event)}
    >
      <FontAwesomeIcon icon={icon} size={"3x"} data-testid={`${testId}-icon`}/>
      <span className={"text-2xl text-center mt-4"} data-testid={`${testId}-caption`}>{caption}</span>
    </div>
  );
};

export default OptionCard;
