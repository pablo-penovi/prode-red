import { useSession } from 'next-auth/react';
import React from 'react';
import MenuOption from '../../../types/MenuOption';
import Role from '../../../types/Role';
import HeaderLink from '../../headerLink';
import Tooltip from '../../tooltip';

export const DEFAULT_TEST_ID = 'desktop-menu';

type DesktopMenuProps = {
  testId?: string,
  options: MenuOption[],
}

const DesktopMenu = ({
  testId,
  options,
}: DesktopMenuProps) => {
  const { data: session } = useSession()

  const shouldRenderOption = (optionRoles: Role[] | undefined): boolean => {
    if (!optionRoles) return true
    if (!session?.user?.role) return false
    if (session.user.role.includes(Role.admin)) return optionRoles.includes(Role.admin)
    return optionRoles.some((role) => (session?.user?.role?.includes(role)))
  }

  const getOption = (menuOption: MenuOption, index: number) => {
    if (shouldRenderOption(menuOption.forRoles)) {
      return (
        menuOption.tooltip
          ? <Tooltip text={menuOption.tooltip}>
            <HeaderLink index={index} menuOption={menuOption} hasSpace={index + 1 < options.length}/>
          </Tooltip>
          : <HeaderLink index={index} menuOption={menuOption} hasSpace={index + 1 < options.length}/>
      )
    }
  }
  
  return (
    <div className="flex" data-testid={testId || DEFAULT_TEST_ID}>
      {
        options.map(getOption)
      }
    </div>
  );
};

export default DesktopMenu;
