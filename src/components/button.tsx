import React, { MouseEventHandler } from 'react';
import { KeyMap } from '../constants/strings';

const DEFAULT_TEST_ID = 'button';
const COLOR: KeyMap = {
  'submit': {
    bg: {
      disabled: 'bg-gray-200',
      enabled: 'bg-primary',
      hover: 'hover:bg-real-red-300',
    },
    text: {
      disabled: 'text-gray-400',
      enabled: 'text-white',
      hover: 'hover:text-white',
    }
  },
  'button': {
    text: {
      disabled: 'text-gray-400',
      enabled: 'text-primary',
      hover: 'hover:text-primary',
    },
    border: {
      disabled: 'border-gray-200',
      enabled: 'border-primary',
      hover: 'hover:border-real-red-300',
    },
    bg: {
      enabled: 'bg-transparent',
      disabled: 'bg-transparent',
      hover: 'hover:bg-real-red-300',
    }
  },
  'reset': {
    bg: {
      disabled: 'bg-gray-200',
      enabled: 'bg-shallow-water-900',
      hover: 'hover:bg-matt-blue-700',
    },
    text: {
      disabled: 'text-gray-400',
      enabled: 'text-theme-light',
      hover: 'hover:text-theme-light',
    },
  }
}

type ButtonProps = {
  label: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  type: "button" | "submit" | "reset",
  disabled?: boolean,
  bgColor?: string,
  textColor?: string,
  bgHoverColor?: string,
  textHoverColor?: string,
  disabledBgColor?: string,
  disabledTextColor?: string,
  testId?: string,
}

const Button = ({
  label,
  onClick,
  type,
  disabled,
  bgColor,
  textColor,
  bgHoverColor,
  textHoverColor,
  disabledBgColor,
  disabledTextColor,
  testId
}: ButtonProps) => {

  const getBgColor = () => (
    (disabled && (disabledBgColor || COLOR[type]?.bg?.disabled)) || bgColor || COLOR[type]?.bg?.enabled || ''
  )

  const getBgHoverColor = () => (
    (disabled && COLOR[type]?.bg?.disabledHover) || bgHoverColor || COLOR[type]?.bg?.hover || ''
  )

  const getTextColor = () => (
    (disabled && COLOR[type]?.text?.disabled) || textColor || COLOR[type]?.text?.enabled || ''
  )

  const getTextHoverColor = () => (
    (disabled && (disabledTextColor || COLOR[type]?.text?.disabledHover)) || textHoverColor || COLOR[type]?.text?.hover || ''
  )

  const getBorderColor = () => (
    (disabled && COLOR[type]?.border?.disabled) || COLOR[type]?.border?.enabled || ''
  )

  const getBorderHoverColor = () => (
    (disabled && COLOR[type]?.border?.disabledHover) || COLOR[type]?.border?.hover || ''
  )

  return (
    <button 
      className={
        `
          flex flex-row justify-center align-middle px-6 py-2
          rounded-lg
          ${!disabled && 'drop-shadow-md'} 
          ${getBgColor()}
          ${getBgHoverColor()}
          ${getTextColor()} 
          ${getTextHoverColor()}
          ${type === 'button' && 'border-2'}
          ${getBorderColor()} 
          ${getBorderHoverColor()}
          ${disabled && 'pointer-events-none'}
          text-md
        `
      }
      data-testid={testId || DEFAULT_TEST_ID}
      onClick={onClick}
      disabled={disabled}
      type={type || 'button'}
    >
      {label}
    </button>
  );
};

export default Button;