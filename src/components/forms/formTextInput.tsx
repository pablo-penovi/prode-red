import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { Regex } from '../../constants/enums';
import { KeyMap } from '../../constants/strings';
import { VALIDATOR } from '../../constants/validators';
import { Field } from '../../hoc/withForm';

const DEFAULT_TEST_ID = 'form-text-input'
const EMPTY = ''
const COLOR: KeyMap = {
  'border': {
    default: 'border-real-red-100',
  },
  'label': {
    requiredMark: 'text-real-red-400'
  },
  'ring': {
    focus: 'ring-accent',
    error: 'ring-real-red-400'
  },
  'helper': {
    default: 'text-gray-300',
    error: 'text-real-red-400'
  }
}

type FormTextInputProps = {
  label: string,  
  placeholder: string,
  name: string,
  field?: Field<string>,
  masked?: boolean,
  defaultValue?: string,
  registerField: (newField: Field<any>) => void,
  onChange: (updatedField: Field<any>) => void,
  helperText?: string,
  minLength?: number,
  maxLength?: number,
  regexList?: Regex[],
  required?: boolean,
  maskCharacter?: string,
  ringFocusColor?: string,
  ringErrorColor?: string,
  testId?: string
}

const FormTextInput = ({
  label,  
  placeholder,
  name,
  field,
  masked,
  defaultValue,
  registerField,
  onChange,
  helperText,
  minLength,
  maxLength,
  regexList,
  required,
  maskCharacter,
  ringFocusColor,
  ringErrorColor,
  testId
}: FormTextInputProps) => {
  const getErrorMessage = (val: string) => {
    return VALIDATOR.required(required, val) || 
      VALIDATOR.minLength(minLength, val) || 
      VALIDATOR.maxLength(maxLength, val) ||
      VALIDATOR.regex(regexList, val);
  }

  const getFieldUpdate = (newValue: string): Field<string> => {
    const errorMessage = getErrorMessage(newValue)
    return {
      name: name,
      value: newValue || defaultValue || EMPTY,
      defaultValue: defaultValue || EMPTY,
      error: errorMessage,
      initialError: getErrorMessage(defaultValue || EMPTY) || EMPTY
    } as Field<string>
  }

  useEffect(() => {
    registerField(getFieldUpdate(defaultValue || EMPTY))
  }, [])

  return (
    <div id="input" className="flex flex-col w-full my-3">
      <label htmlFor={name} className="text-sm mb-2 ml-1">
        {label}{required && <span className={`${COLOR['label'].requiredMark} ml-1`}>*</span>}
      </label>
      <input
        type={masked ? 'password' : 'text'}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`appearance-none text-sm rounded-lg px-4 py-3 
          placeholder-gray-300 
          focus:outline-none 
          focus:ring-2 
          focus:ring-shallow
          focus:shadow-lg
          ${ field?.error ? 'ring-1' + ' ' + (ringErrorColor || COLOR['ring'].error) : ''}
          ${ ringFocusColor || COLOR['ring'].focus }
          border border-gray-300`}
        value={field?.value || defaultValue || EMPTY}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(getFieldUpdate(event.target.value))}
        minLength={minLength}
        maxLength={maxLength}
        data-testid={testId || DEFAULT_TEST_ID}
      />
      {(field?.error || helperText) && <span className={`text-xs mt-1 ml-1 ${field?.error ? ringErrorColor || COLOR['helper'].error : ''} text-xs mt-1`}>
        {field?.error || helperText}
      </span>}
    </div>
  );
};

export default FormTextInput;
