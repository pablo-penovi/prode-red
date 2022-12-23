import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { Regex } from '../../constants/enums';
import { KeyMap } from '../../constants/strings';
import { VALIDATOR } from '../../constants/validators';
import { Field, SideEffectType, WithFormProps } from '../../hoc/withForm';

const DEFAULT_TEST_ID = 'form-text-input'
const DEFAULT_MATCH_ERROR_MESSAGE = 'Las contraseñas no coinciden'
const EMPTY = ''
const COLOR: KeyMap = {
  'border': {
    default: 'border-real-red-100',
  },
  'label': {
    requiredMark: 'text-real-red-400'
  },
  'ring': {
    error: 'ring-real-red-400'
  },
  'helper': {
    default: 'text-gray-300',
    error: 'text-real-red-400'
  }
}

export type TextInputOptions = {
  matchesField: string
}

type FormTextInputProps = {
  label: string,  
  placeholder: string,
  name: string,
  type?: string,
  defaultValue?: string,
  helperText?: string,
  minLength?: number,
  maxLength?: number,
  regexList?: Regex[],
  required?: boolean,
  ringFocusColor?: string,
  ringErrorColor?: string,
  matchesFields?: string[],
  matchErrorMessage?: string,
  testId?: string
}

const FormTextInput = ({
  label,  
  placeholder,
  name,
  form,
  type,
  defaultValue,
  helperText,
  minLength,
  maxLength,
  regexList,
  required,
  ringFocusColor,
  ringErrorColor,
  matchesFields,
  matchErrorMessage,
  testId
}: FormTextInputProps & WithFormProps) => {
  const getErrorMessage = (val: string) => {
    return VALIDATOR.required(required, val) || 
      VALIDATOR.minLength(minLength, val) || 
      VALIDATOR.maxLength(maxLength, val) ||
      VALIDATOR.regex(regexList, val) ||
      (matchesField && VALIDATOR.passwordsMatch(val, form.valueOf(matchesField), matchErrorMessage || DEFAULT_MATCH_ERROR_MESSAGE) || undefined)
  }

  const getFieldUpdate = (newValue: string): Field<string> => {
    const errorMessage = getErrorMessage(newValue)
    const field = {
      name: name,
      value: newValue || defaultValue || EMPTY,
      defaultValue: defaultValue || EMPTY,
      error: errorMessage,
      initialError: getErrorMessage(defaultValue || EMPTY) || EMPTY,
    } as Field<string>
    field.sideEffects = [{type: SideEffectType.MATCH, targetFields: matchesFields}]
  }

  const getType = () => (masked ? 'password' : (type === 'password' ? 'text' : type))

  const [masked, setMasked] = useState(type === 'password')

  useEffect(() => {
    form.registerField(getFieldUpdate(defaultValue || EMPTY))
  })

  return (
    <div id="input" className="flex flex-col w-full my-3">
      <label htmlFor={name} className="text-sm mb-2 ml-1">
        {label}{required && <span className={`${COLOR['label'].requiredMark} ml-1`}>*</span>}
      </label>
      <input
        type={getType()}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`appearance-none text-sm rounded-lg px-4 py-3 
          placeholder-gray-300 
          focus:outline-none 
          focus:ring-2 
          focus:ring-shallow
          focus:shadow-lg
          focus:ring-accent
          ${ form.get(name)?.error ? 'ring-1' + ' ' + (ringErrorColor || COLOR['ring'].error) : ''}
          border border-gray-300`}
        value={form.get(name)?.value || defaultValue || EMPTY}
        onChange={(event: ChangeEvent<HTMLInputElement>) => form.onChange(getFieldUpdate(event.target.value))}
        minLength={minLength}
        maxLength={maxLength}
        data-testid={testId || DEFAULT_TEST_ID}
      />
      { type === 'password' &&
      <FontAwesomeIcon icon={masked ? faEye : faEyeSlash} className="w-6 absolute top-[53px] right-10 cursor-pointer hover:text-real-red-300" onClick={() => setMasked(!masked)}/>}
      {(form.get(name)?.error || helperText) && <span className={`text-xs mt-1 ml-1 ${form.get(name)?.error ? ringErrorColor || COLOR['helper'].error : ''} text-xs mt-1`}>
        {form.get(name)?.error || helperText}
      </span>}
    </div>
  );
};

export default FormTextInput;
