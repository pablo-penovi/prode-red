import { useSession } from 'next-auth/react';
import React from 'react';
import { MenuOption } from './header';

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
  
  return (
    <div className="text-sm lg:flex-grow" data-testid={testId || DEFAULT_TEST_ID}>
      {
        options.map((menuOption, index) => (
          <a key={index} href={menuOption.href} className={`block mt-4 lg:inline-block lg:mt-0 text-white hover:text-red-400 ${index + 1 < options.length ? 'mr-4' : ''}`} data-testid={`${testId || DEFAULT_TEST_ID}-option-${index}`}>
            {menuOption.name}
          </a>
        ))
      }
    </div>
  );
};

export default DesktopMenu;