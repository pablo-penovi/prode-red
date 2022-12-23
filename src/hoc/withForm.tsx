import React, { ComponentType, useState } from 'react';

export enum SideEffectType {
  MATCH,
  RESET
}

interface SideEffect {
  type: SideEffectType,
  apply: (updatedField: Field<any>, fields: Field<any>[]) => Field<any>[]
}

const setErrorForMatchingFields = (updatedField: Field<any>, fields: Field<any>[], matchingFieldNames: string[]) => {
  let newFields: Field<any>[] = [...fields]
  matchingFieldNames.forEach((matchingFieldName) => {
    newFields = newFields.map((field) => field.name === matchingFieldName ? {...field, error: updatedField.error} : field)
  })
  return newFields
}

const resetMatchingFields = (fields: Field<any>[], matchingFieldNames: string[]) => {
  let newFields: Field<any>[] = [...fields]
  matchingFieldNames.forEach((matchingFieldName) => {
    newFields = newFields.map((field) => field.name === matchingFieldName ? {...field, value: field.defaultValue} : field)
  })
  return newFields
}

const sideEffects: SideEffect[] = [
  {
    type: SideEffectType.MATCH,
    apply: (updatedField: Field<any>, fields: Field<any>[]): Field<any>[] => {
      const matchingFieldNames = fields
      .filter((field) => {
        return !!field.sideEffects?.find((sideEffect) => sideEffect.type === SideEffectType.MATCH && sideEffect.targetFields.includes(updatedField.name))
      })
      .map((field) => field.name)
      return setErrorForMatchingFields(updatedField, fields, matchingFieldNames)
    }
  },
  {
    type: SideEffectType.RESET,
    apply: (updatedField: Field<any>, fields: Field<any>[]): Field<any>[] => {
      const matchingFieldNames = fields
      .filter((field) => {
        return !!field.sideEffects?.find((sideEffect) => sideEffect.type === SideEffectType.RESET && sideEffect.targetFields.includes(updatedField.name))
      })
      .map((field) => field.name)
      return resetMatchingFields(fields, matchingFieldNames)
    }
  }
]

export type Field<T> = {
  name: string,
  value: T,
  defaultValue: T,
  error?: string,
  initialError?: string,
  sideEffects?: [{
    type: SideEffectType,
    targetFields: string[],
  }]
}

export type WithFormProps = {
  form: {
    onChange: (updatedField: Field<any>) => void,
    isSubmitDisabled: () => boolean,
    fields: Field<any>[],
    get: (fieldName: string) => Field<any> | undefined
    valueOf: (fieldName: string) => any,
    errorOf: (fieldName: string) => string | undefined,
    defaultOf: (fieldName: string) => any,
    isError: (fieldName: string) => boolean | undefined,
    isDirty: () => boolean,
    reset: () => void,
    registerField: (newField: Field<any>) => void
  }
}

function WithForm<T>(WrappedComponent: ComponentType<T & WithFormProps>) {
  const ComponentWithForm = (inheritedProps: T) => {
    const [fields, setFields] = useState([] as Field<any>[])

    const get = (fieldName: string): Field<any> | undefined => (
      fields.find((field) => field.name === fieldName)
    )

    const applySideEffects = (updatedField: Field<T>): Field<any>[] => {
      let newFields: Field<any>[] = [...fields]
      for (const sideEffect of sideEffects) {
        newFields = sideEffects.find((se) => se.type === sideEffect.type)?.apply(updatedField, newFields) || newFields
      }
      return newFields
    }

    const onChange = (updatedField: Field<T>): void => {
      const newFields = applySideEffects(updatedField)
      setFields(newFields.map((field) => field.name === updatedField.name ? updatedField : field))
    }

    const registerField = (newField: Field<T>): void => {
      !fields.some((field) => field.name === newField.name) && fields.push(newField)
    }

    const isDirty = (): boolean => (
      fields.some((field) => JSON.stringify(field.value) !== JSON.stringify(field.defaultValue))
    )

    const reset = (): void => {
      setFields(fields.map((field) => ({...field, value: field.defaultValue, error: field.initialError})))
    }

    const isSubmitDisabled = (): boolean => (
      fields.some((field) => !!field.error)
    )

    const valueOf = (fieldName: string): any | undefined => (
      fields.find((field) => field.name === fieldName)?.value
    )

    const errorOf = (fieldName: string): string | undefined => (
      fields.find((field) => field.name === fieldName)?.error
    )

    const isError = (fieldName: string): boolean | undefined => (
      !!errorOf(fieldName)
    )

    const defaultOf = (fieldName: string): any => {
      return fields.find((field) => field.name === fieldName)?.defaultValue
    }

    const exists = (fieldName: string): boolean => (
      !!fields.find((field) => field.name === fieldName)
    )

    const form: WithFormProps = {
      form: {
        onChange: onChange,
        isSubmitDisabled: isSubmitDisabled,
        fields: fields,
        get: get,
        valueOf: valueOf,
        errorOf: errorOf,
        defaultOf: defaultOf,
        isError: isError,
        isDirty: isDirty,
        reset: reset,
        registerField: registerField
      }
    }

    return <WrappedComponent {...inheritedProps} {...form} />;
  }

  return ComponentWithForm;
}

export default WithForm;