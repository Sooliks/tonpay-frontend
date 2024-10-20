import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.MODE === 'PRODUCTION' ? "https://sooliks-tonpay-backend-8ff0.twc1.net/api" : 'http://localhost:4200/api'
})

axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem("token")
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        }catch (e) {
            return config
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance