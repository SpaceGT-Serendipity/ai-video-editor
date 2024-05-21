import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 443,
		// https: {
		// 	key: fs.readFileSync('./cert/127.0.0.1-key.pem'),
		// 	cert: fs.readFileSync('./cert/127.0.0.1.pem'),
		// },
	},
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
	},
	plugins: [vue()]
})