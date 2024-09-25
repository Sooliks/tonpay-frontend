import axios from "axios"

const axiosInstance = axios.create({
    baseURL: false ? "http://localhost:4200/api" : 'https://sooliks-tonpay-backend-33f7.twc1.net/api'
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