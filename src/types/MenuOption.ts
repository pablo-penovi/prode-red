import Role from "./Role"

export type MenuOption = {
  name: string,
  href: string,
  forRoles?: Role[]
}