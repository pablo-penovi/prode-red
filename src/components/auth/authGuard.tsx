import React, { Fragment, ReactNode, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoaderOverlay from '../loaderOverlay';
import Role from '../../types/Role';

export const DEFAULT_TEST_ID = 'app-container';

type AuthGuardProps = {
  testId?: string,
  children: ReactNode,
}

const PUBLIC_PAGES = [
  '/auth/signin',
  '/auth/register',
  '/auth/error',
  '/site/schedule',
  '/_error',
  '/'
]

const AuthGuard = ({
  children,
}: AuthGuardProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isAuthenticated = useCallback((): boolean => {
    // All other pages require user authenticated
    return !!session?.user
  }, [session?.user])

  const isPublicPage = useCallback((): boolean => {
    // All other pages require user authenticated
    return PUBLIC_PAGES.includes(router.pathname)
  }, [router.pathname])

  const isAuthorized = () => (
    isAuthenticated() &&
    (!router.pathname.startsWith('/admin') || session?.user?.role?.includes(Role.admin))
  )

  useEffect(() => {
    if (!isPublicPage() && !isAuthenticated()) {
      router.push('/')
    }
    // TODO: Esta regla redirige a /site cuando quiero entrar a /site/admin, aunque sea admin. Revisar por que
    if (isAuthenticated() && (router.pathname === '/' || router.pathname.startsWith('/auth'))) {
      router.push('/site/admin')
    }
  }, [isPublicPage, isAuthenticated, router])

  return (
    <Fragment>
      { status === 'loading' && <LoaderOverlay testId={'router-spinner'}/> }
      { !(status === 'loading') && (isPublicPage() || isAuthorized()) &&
        children
      }
    </Fragment>
  );
};

export default AuthGuard;
