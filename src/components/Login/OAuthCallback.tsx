import { useAuthStore } from '@/stores/useAuthStore'
import { getOAuthError, getStateFromUrl, isOAuthCallback } from '@/utils/oauth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinner'

function OAuthCallback() {
  const [isProcessing, setIsProcessing] = useState(true)
  const navigate = useNavigate()
  const oauthLoginSuccess = useAuthStore((state) => state.oauthLoginSuccess)

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (!isOAuthCallback()) {
        setIsProcessing(false)
        return
      }

      try {
        const error = getOAuthError()
        if (error) {
          navigate('/login')
          return
        }

        const state = getStateFromUrl()
        if (!state) {
          navigate('/login')
          return
        }

        //OAuth 성공: 홈으로 리다이렉트
      } catch (error) {
        console.error('로그인 중 오류가 발생했습니다: ', error)
        navigate('/login')
      } finally {
        setIsProcessing(false)
      }
    }
    handleOAuthCallback()
  }, [navigate, oauthLoginSuccess])

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }
  return null
}

export default OAuthCallback
