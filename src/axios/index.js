import axios from 'axios'

const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	withCredentials: false,
	timeout:0
})

service.interceptors.request.use((config) => {
	config.headers['x-openid'] = 'wangshuo'
	return config
}, (error) => {
	return Promise.reject(error)
})

service.interceptors.response.use((response) => {
	return response.data;
}, (error) => {
	return Promise.reject(error);
});

export default service;