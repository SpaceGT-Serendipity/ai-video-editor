import {
	createRouter,
	createWebHistory
} from 'vue-router';

import Editor from '../views/index.vue'
import {
	ElNotification
} from 'element-plus'

export const generalRoutes = [{
	path: '/',
	redirect: '/editor',
	children: [{
		path: 'editor',
		name: 'Editor',
		component: Editor
	}]
}]


const router = createRouter({
	history: createWebHistory(),
	routes: generalRoutes
})
 
export default router