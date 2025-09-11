import axiosInstance from '@/utils/axiosInstance'

export const getStatistics = async () => {
  const res = await axiosInstance.get('/member/statistics')
  return res.data.result
}
