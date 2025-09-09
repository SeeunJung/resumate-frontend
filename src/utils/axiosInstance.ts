import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
})

// //요청 인터셉터
// axiosInstance.interceptors.request.use((config) => {
//   return config
// })

// //응답 인터셉터
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // const request = error.config

//     //액세스 토큰 만료시 실행
//     // if (error.response?.status === 401 && !request._retry) {
//     //   request._retry = true

//     //   const deviceId = localStorage.getItem('deviceId') || crypto.randomUUID()
//     //   localStorage.setItem('deviceId', deviceId)

//     //   try {
//     //     //토큰 재발급 요청
//     //     await axios.get(`${BASE_URL}/auth/reissue?deviceId=${deviceId}`, {
//     //       withCredentials: true,
//     //     })

//     //     return axiosInstance(request)
//     //   } catch (error) {
//     //     window.location.href = '/login'
//     //     return Promise.reject(error)
//     //   }
//     // }
//     return Promise.reject(error)
//   },
// )

export default axiosInstance
