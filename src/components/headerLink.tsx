import React from 'react';
import Link from 'next/link';
import MenuOption from '../types/MenuOption';

export const DEFAULT_TEST_ID = 'desktop-menu';
const LINK_STYLE = `text-white hover:text-red-400`
const LINK_STYLE_WITH_MARGIN = `text-white hover:text-red-400 mr-4`

type HeaderLinkProps = {
  testId?: string,
  index: number,
  menuOption: MenuOption,
  hasSpace: boolean,
}

const HeaderLink = ({
  testId,
  index,
  menuOption,
  hasSpace,
}: HeaderLinkProps) => {

  return (
     <Link key={index} href={menuOption.enabled ? menuOption.href : '#'}>
       <a className={hasSpace ? LINK_STYLE_WITH_MARGIN : LINK_STYLE} data-testid={`${testId || DEFAULT_TEST_ID}-option-${index}`}>
         {menuOption.name}
       </a>
     </Link>
  )
}

export default HeaderLink;
