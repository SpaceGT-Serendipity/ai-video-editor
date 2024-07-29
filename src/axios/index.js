import axios from 'axios'
import {
	useAccountStore
} from '../store/account.js'

const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_SERVER,
	withCredentials: false,
	timeout:0
})

service.interceptors.request.use((config) => {
	const accountStore = useAccountStore()
	config.headers['x-openid'] = accountStore.id
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