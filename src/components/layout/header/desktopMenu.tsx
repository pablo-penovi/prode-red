import { useSession } from 'next-auth/react';
import React from 'react';
import { MenuOption } from '../../../types/MenuOption';
import Link from 'next/link';
import Role from '../../../types/Role';

export const DEFAULT_TEST_ID = 'desktop-menu';
const LINK_STYLE = `text-white hover:text-red-400`
const LINK_STYLE_WITH_MARGIN = `text-white hover:text-red-400 mr-4`

type DesktopMenuProps = {
  testId?: string,
  options: MenuOption[],
}

const DesktopMenu = ({
  testId,
  options,
}: DesktopMenuProps) => {
  const { data: session } = useSession()

  const getLinkStyle = (index: number): string => {
    return index + 1 < options.length ? LINK_STYLE_WITH_MARGIN : LINK_STYLE
  }

  const shouldRenderOption = (optionRole: Role | undefined): boolean => (
    !optionRole || (!!session?.user && (session.user.role === Role.admin || optionRole === session.user.role))
  )

  const getOption = (menuOption: MenuOption, index: number) => {
    if (shouldRenderOption(menuOption.forRole)) {
      return (
        <Link key={index} href={menuOption.href}>
          <a className={getLinkStyle(index)} data-testid={`${testId || DEFAULT_TEST_ID}-option-${index}`}>
            {menuOption.name}
          </a>
        </Link>
      )
    }
  }
  
  return (
    <div className="text-sm lg:flex-grow" data-testid={testId || DEFAULT_TEST_ID}>
      {
        options.map(getOption)
      }
    </div>
  );
};

export default DesktopMenu;