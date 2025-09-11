import { logout } from '@/services/auth'
import { useAuthStore } from '@/stores/useAuthStore'

const clearAuthState = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')

  const authStore = useAuthStore.getState()
  authStore.logout()
}

const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('deviceId')
  if (!deviceId) {
    deviceId = crypto.randomUUID()
    localStorage.setItem('deviceId', deviceId)
  }
  return deviceId
}

export const logoutUser = async (): Promise<boolean> => {
  try {
    const deviceId = getDeviceId()
    await logout(deviceId)
    clearAuthState()
    return true
  } catch (error: any) {
    console.error('로그아웃 실패: ', error)

    if (error.response?.status === 401) {
      clearAuthState()
      return true
    }

    if (error.response?.status === 400) {
      clearAuthState()
      return true
    }
    clearAuthState()
    return false
  }
}

export const forceLogout = (): void => {
  clearAuthState()
}
