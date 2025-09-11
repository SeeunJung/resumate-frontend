import { useAuthStore } from '@/stores/useAuthStore'
import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinner'

interface AuthWrapperProps {
  children: ReactNode
  requireAuth?: boolean
  fallback?: ReactNode
}

function AuthWrapper({
  children,
  requireAuth = true,
  fallback,
}: AuthWrapperProps) {
  const { isAuthenticated, isLoading } = useAuthStore()
  const { validateToken } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (!isAuthenticated && requireAuth) {
      validateToken().then((isValid) => {
        if (!isValid) {
          navigate('/login', { replace: true })
        } else {
          console.log('인증된 사용자입니다.')
        }
      })
    }
  }, [
    requireAuth,
    isAuthenticated,
    isLoading,
    fallback,
    validateToken,
    navigate,
  ])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>
    } else {
      return (
        <div className="flex flex-col justify-center items-center">
          <span className="text-sm">로그인 페이지로 이동 중입니다.</span>
          <LoadingSpinner />
        </div>
      )
    }
  }

  return <>{children}</>
}

export default AuthWrapper
