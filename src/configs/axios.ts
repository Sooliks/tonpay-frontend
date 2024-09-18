import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.MODE === 'dev' ? "http://localhost:4200/api" : 'https://tonpay-backend.vercel.app/api'
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance