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
// 图标组件
import {
	library
} from '@fortawesome/fontawesome-svg-core'
import {
	FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import * as freeBrandsSvgIcons from '@fortawesome/free-brands-svg-icons'
import * as freeRegularSvgIcons from '@fortawesome/free-regular-svg-icons'
import * as freeSolidSvgIcons from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)
app.use(ElementPlus, {
	locale: zhCn
})
app.use(router)
app.mount('#app')

for (let key in ElIconModules) {
	app.component(key, ElIconModules[key])
}

app.component('font-awesome-icon', FontAwesomeIcon)

library.add(
	freeSolidSvgIcons.faExpand,
	freeSolidSvgIcons.faCompress,
	freeSolidSvgIcons.faArrowRotateLeft,
	freeSolidSvgIcons.faArrowRotateRight,
	freeSolidSvgIcons.faICursor,
)