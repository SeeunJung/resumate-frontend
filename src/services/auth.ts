import axiosInstance from '@/utils/axiosInstance'

interface setNicknameProps {
  nickname: string
}

export const verification = async () => {
  const res = await axiosInstance.get('/auth/me')
  return res.data
}

export const logout = async (deviceId: string) => {
  const res = await axiosInstance.post(`/auth/logout?deviceId=${deviceId}`)
  return res
}

export const setNickname = async (payload: setNicknameProps) => {
  await axiosInstance.post('/member/nickname', payload)
}
