import { signIn, useSession } from 'next-auth/react';
import React, { ReactNode, useCallback, useEffect } from 'react';
import { KeyMap } from '../constants/strings';
import useStore from '../state/store';
import LoaderOverlay from './loaderOverlay';
import { useRouter } from 'next/router';

export const DEFAULT_TEST_ID = 'app-container';
const DEFAULT_CONTAINER_STYLES = `flex flex-col align-middle justify-start min-h-screen text-theme-dark antialiased bg-gradient-to-br from-real-red-300 to-matt-blue-800`
const PADDING: KeyMap = {
  'loading': DEFAULT_CONTAINER_STYLES,
  'default': `${DEFAULT_CONTAINER_STYLES} p-10`
}

type AppContainerProps = {
  testId?: string,
  children: ReactNode
}

const AppContainer = ({
  testId,
  children,
}: AppContainerProps) => {
  const router = useRouter()
  const { isShowSpinner, setShowSpinner } = useStore()
  const isLoginOrRegisterPage = useCallback(() => (
    router.pathname === '/auth/login' || router.pathname === '/auth/register'
  ), [router.pathname])
  
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      if (!isLoginOrRegisterPage()) {
        signIn()
      }
    },
  })

  useEffect(() => {
    setShowSpinner(!isLoginOrRegisterPage() && status === 'loading')
  }, [status, isLoginOrRegisterPage, setShowSpinner])

  const getContainerClasses = () => (
    PADDING[status] || PADDING['default']
  )

  return (
    <div className={`${getContainerClasses()}`} data-testid={testId || DEFAULT_TEST_ID}>
      { isShowSpinner ? (
          <LoaderOverlay testId={'session-spinner'}/>
        ) : (
          children
        )}
    </div>
  );
};

export default AppContainer;