import {
	createApp
} from 'vue'
import App from './App.vue'
// element+ UI
import ElementPlus from 'element-plus'
import * as ElIconModules from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/dark/css-vars.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 路由
import router from './router/index.js'

const app = createApp(App)
app.use(ElementPlus, {
	locale: zhCn
})
app.use(router)
app.mount('#app')

for (let key in ElIconModules) {
	app.component(key, ElIconModules[key])
}