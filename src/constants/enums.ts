export const DNI_REGEX = new RegExp('^[F|M|0-9]?[0-9]{7}$', 'i')

export type Regex = {
  expression: RegExp,
  errorIf: boolean,
  message: string
}
export const Regex = {
    email: {
      expression: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
      errorIf: false,
      message: 'No es un email válido'
    } as Regex,
    matchPassword: (word: string) => ({
      expression: new RegExp(`^${word}$`),
      errorIf: false,
      message: 'Las contraseñas no coinciden'
    } as Regex),
    dni: {
      expression: DNI_REGEX,
      errorIf: false,
      message: 'No es un DNI válido'
    }
} as const
