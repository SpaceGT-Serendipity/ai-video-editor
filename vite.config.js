import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 10000
	},
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
	},
	plugins: [vue()]
})