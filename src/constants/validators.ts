import { Regex } from "./enums";

export const VALIDATOR = {
  required: (required: boolean | undefined, value: any | undefined) => required && value?.length === 0 ? 'Este campo es requerido' : undefined,
  minLength: (minLength: number | undefined, value: any | undefined) => minLength && value?.length < minLength ? `Se requiere un mínimo de ${minLength} caracteres` : undefined,
  maxLength: (maxLength: number | undefined, value: any | undefined) => maxLength && value?.length > maxLength ? `No debe exceder los ${maxLength} caracteres` : undefined,
  regex: (regexList: Regex[] | undefined, value: string | undefined) => value && regexList?.find((regex) => regex.expression.test(value) === regex.errorIf)?.message,
  passwordsMatch: (firstValue: any, secondValue: any, message: string) => (firstValue !== secondValue ? message : undefined)
}