import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

export const DEFAULT_TEST_ID = 'profile-button';

type ProfileButtonProps = {
  testId?: string,
}

const ProfileButton = ({
  testId,
}: ProfileButtonProps) => {
  const { data: session } = useSession({ required: true })
  
  return (
    <div className="flex flex-row items-center text-white hover:text-red-400 cursor-pointer" data-testid={testId || DEFAULT_TEST_ID}>
      {session?.user?.image ? 
        <Image src={session?.user?.image} alt="userpic" width={'40px'} height={'40px'} data-testid={`${testId || DEFAULT_TEST_ID}-logo`}/>
        :
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8" data-testid={`${testId || DEFAULT_TEST_ID}-icon`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      }
      <span className="ml-2" data-testid={`${testId || DEFAULT_TEST_ID}-username`}>{session?.user?.name}</span>
    </div>
  );
};

export default ProfileButton;