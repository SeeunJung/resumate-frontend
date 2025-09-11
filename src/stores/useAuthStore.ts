import { verification } from '@/services/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  user: {
    memberId: string | null
    nickname: string | null
    email: string | null
    deviceId: string | null
  }
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  oauthLoginSuccess: (userData: {
    memberId: string | null
    nickname: string | null
    email: string | null
  }) => void
  login: () => Promise<void>
  signup: () => Promise<void>
  logout: () => void
  validateToken: () => Promise<boolean>
  clearError: () => void
  setLoading: (loading: boolean) => void
  updateNickname: (nickname: string) => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: {
        memberId: null,
        nickname: null,
        email: null,
        deviceId: null,
      },
      isLoading: false,
      error: null,

      //Auth 액션
      oauthLoginSuccess: (userData) => {
        const deviceId = crypto.randomUUID()
        const newState = {
          isAuthenticated: true,
          user: {
            memberId: userData.memberId?.toString() ?? null,
            nickname: userData.nickname,
            email: userData.email,
            deviceId: deviceId,
          },
          isLoading: false,
          error: null,
        }
        set(newState)
      },

      login: async () => {
        set({ isLoading: true, error: null })
        try {
          throw new Error('API not implemented yet.')
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed.',
            isLoading: false,
          })
        }
      },

      signup: async () => {
        set({ isLoading: true, error: null })
        try {
          throw new Error('API not implemented yet.')
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Signup failed.',
            isLoading: false,
          })
        }
      },

      logout: () => {
        localStorage.removeItem('auth-storage')
        set({
          isAuthenticated: false,
          user: {
            memberId: null,
            email: null,
            nickname: null,
            deviceId: null,
          },
          isLoading: false,
          error: null,
        })
      },

      validateToken: async () => {
        try {
          const currentState = useAuthStore.getState()
          const response = await verification()

          if (response?.data) {
            const userData = response.data
            let deviceId = currentState.user.deviceId
            if (!deviceId) {
              deviceId = crypto.randomUUID()
            }

            const newState = {
              isAuthenticated: true,
              user: {
                memberId: userData.memberId?.toString() ?? null,
                nickname: userData.nickname,
                email: userData.email,
                deviceId: deviceId,
              },
              isLoading: false,
              error: null,
            }
            set(newState)
            return true
          }
          return false
        } catch (error) {
          if ((error as any)?.response?.status === 401) {
            set({
              isAuthenticated: false,
              user: {
                memberId: null,
                nickname: null,
                email: null,
                deviceId: null,
              },
              isLoading: false,
              error: null,
            })
          }
          return false
        }
      },

      clearError: () => {
        set({ error: null })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      updateNickname: (nickname: string) =>
        set((state) => ({
          user: {
            ...state.user,
            nickname,
          },
        })),
    }),

    {
      name: 'auth-storage',
      partialize: (state) => {
        if (state.isAuthenticated && state.user.memberId) {
          const persistedData = {
            isAuthenticated: state.isAuthenticated,
            user: {
              memberId: state.user.memberId,
              nickname: state.user.nickname,
              email: state.user.email,
              deviceId: state.user.deviceId,
            },
          }
          return persistedData
        }
        return {}
      },
    },
  ),
)
