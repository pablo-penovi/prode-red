import React, { Fragment, ReactNode, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Role from '../../types/Role';
import LoaderOverlay from '../loaderOverlay';

export const DEFAULT_TEST_ID = 'app-container';

type AuthGuardProps = {
  testId?: string,
  children: ReactNode,
}

const PUBLIC_PAGES = [
  '/auth/signin',
  '/auth/register',
  '/auth/error',
  '/_error',
  '/'
]

const AuthGuard = ({
  testId,
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

  const userHasRole = (userRole: Role): boolean => (
    session?.user?.roles?.some((role) => role.name === userRole.name) || false
  )

  const isAuthorized = () => (
    isAuthenticated() &&
    (!router.pathname.startsWith('/admin') || userHasRole({ id: '', name: 'admin'}))
  )

  useEffect(() => {
    if (!isPublicPage() && !isAuthenticated()) {
      router.push('/auth/signin')
    }
    if (router.pathname === '/') {
      router.push('/site')
    }
  }, [isPublicPage, isAuthenticated, router])

  return (
    <Fragment>
      { status === 'loading' && <LoaderOverlay testId={'router-spinner'}/> }
      { !(status === 'loading') && (isPublicPage() || (isAuthenticated() && isAuthorized())) &&
        children
      }
    </Fragment>
  );
};

export default AuthGuard;