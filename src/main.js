import {
	createApp
} from 'vue'
import App from './App.vue'
import Test from './Test.vue'
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
// 拖拽可修改大小
import VueDraggableResizable from 'vue-draggable-resizable'
// 数据持久化
import {
	createPinia
} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 右键菜单
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
// 引入动画
import 'animate.css';

const app = createApp(App)
app.use(ElementPlus, {
	locale: zhCn
})
app.use(router)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(ContextMenu)

for (let key in ElIconModules) app.component(key, ElIconModules[key])
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('vue-draggable-resizable', VueDraggableResizable)
library.add(
	freeSolidSvgIcons.faArrowRotateLeft,
	freeSolidSvgIcons.faArrowRotateRight,
	freeSolidSvgIcons.faCompress,
	freeSolidSvgIcons.faExpand,
	freeSolidSvgIcons.faEyeSlash,
	freeSolidSvgIcons.faFileAudio,
	freeSolidSvgIcons.faICursor,
	freeSolidSvgIcons.faFileAudio,
	freeSolidSvgIcons.faVolumeLow,
	freeSolidSvgIcons.faVolumeXmark,
	freeSolidSvgIcons.faUpload,
	freeSolidSvgIcons.faHeadset,
	freeSolidSvgIcons.faHeadphones,
	freeSolidSvgIcons.faPenRuler,
	freeSolidSvgIcons.faPerson,
	freeSolidSvgIcons.faPlay,
	freeSolidSvgIcons.faPause,
	freeSolidSvgIcons.faSquarePlus,
	freeSolidSvgIcons.faSpinner,
	freeSolidSvgIcons.faT,
	freeRegularSvgIcons.faFloppyDisk,
	freeSolidSvgIcons.faUser,
	freeSolidSvgIcons.faRightFromBracket,
)
app.mount('#app')
