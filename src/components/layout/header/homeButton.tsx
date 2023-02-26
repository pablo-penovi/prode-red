import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export const DEFAULT_TEST_ID = 'home-button';

type HomeButtonProps = {
  testId?: string,
}

const HomeButton = ({
  testId,
}: HomeButtonProps) => {
  const router = useRouter();
  
  return (
    <div className="flex items-center flex-shrink-0 text-white mr-6 cursor-pointer" onClick={() => router.push('/')} data-testid={testId || DEFAULT_TEST_ID}>
      <Image src="/img/logo.png" alt="RED logo" width={'50px'} height={'50px'} data-testid={`${testId || DEFAULT_TEST_ID}-logo`}/>
      <span className="font-semibold text-xl tracking-tight ml-3" data-testid={`${testId || DEFAULT_TEST_ID}-text`}>Prode</span>
    </div>
  );
};

export default HomeButton;
