import { useAuthStore } from '@/stores/useAuthStore'

type OAuthProvider = 'kakao' | 'naver' | 'google'

export const getLoginUrl = (provider: OAuthProvider): string => {
  const state = useAuthStore.getState()
  const deviceId = state.user.deviceId
  const baseUrl = import.meta.env.VITE_LOGIN_BASE_URL

  const tempDeviceId = deviceId || crypto.randomUUID()

  let loginUrl: string
  switch (provider) {
    case 'kakao':
      loginUrl = `${baseUrl}/oauth2/authorization/kakao?state=${tempDeviceId}`
      break
    case 'naver':
      loginUrl = `${baseUrl}/oauth2/authorization/naver?state=${tempDeviceId}`
      break
    case 'google':
      loginUrl = `${baseUrl}/oauth2/authorization/google?state=${tempDeviceId}`
      break
    default:
      throw new Error(`지원하지 않는 OAuth 제공자입니다: ${provider}`)
  }
  return loginUrl
}

export const startLogin = (provider: OAuthProvider): void => {
  try {
    const loginUrl = getLoginUrl(provider)
    window.location.assign(loginUrl)
  } catch (error) {
    throw error
  }
}

export const getStateFromUrl = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('state')
}

export const isOAuthCallback = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.has('code') || urlParams.has('error')
}

export const getOAuthError = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('error')
}
