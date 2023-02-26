import { IconDefinition } from "@fortawesome/free-regular-svg-icons"
import Role from "./Role"

type MenuOption = {
  name: string,
  href: string,
  forRoles?: Role[],
  icon?: IconDefinition,
  enabled: boolean,
  tooltip?: string,
}

export default MenuOption
