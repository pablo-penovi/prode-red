import { useSession } from 'next-auth/react';
import React, { Fragment } from 'react';
import Button from '../../button';
import { useRouter } from 'next/router';
import ProfileButton from './profileButton';
import HomeButton from './homeButton';
import DesktopMenu from './desktopMenu';
import { MenuOption } from '../../../types/MenuOption';
import Role from '../../../types/Role';

export const DEFAULT_TEST_ID = 'header';

type HeaderProps = {
  testId?: string,
}

const MENU_OPTIONS: MenuOption[] = [
  {
    name: 'Calendario',
    href: '/site/schedule',
  },
  {
    name: 'Jugadas',
    href: '/site/plays',
    forRoles: [Role.user]
  },
]

const Header = ({
  testId,
}: HeaderProps) => {
  const { status } = useSession()
  const router = useRouter();
  
  return (
    <Fragment>
      {!router.pathname.startsWith('/auth') &&
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
          <HomeButton />
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <DesktopMenu options={MENU_OPTIONS}/>
            {status === 'authenticated' ?
              <ProfileButton />
              :
              <div className="flex flex-row items-center text-white" data-testid={`${testId || DEFAULT_TEST_ID}-login-button`}>
                <Button 
                  label={'Ingresá'}
                  type={'submit'}
                  onClick={() => router.push('/auth/signin')}
                />
              </div>
            }
          </div>
        </nav>
      }
    </Fragment>
  );
};

export default Header;