import {
	createRouter,
	createWebHistory
} from 'vue-router';

import Editor from '../views/index.vue'
import Console from '../views/console/index.vue'
import {
	ElNotification
} from 'element-plus'

export const generalRoutes = [{
	path: '/',
	redirect: '/console',
	children: [{
		path: 'console',
		name: 'Console',
		component: Console,
		redirect: '/console/create_new_video',
		children: [{
			path: 'create_new_video',
			name: 'CreateNewVideo',
			component: () => import('../views/console/pages/create_new_video.vue')
		}, {
			path: 'audio',
			name: 'Audio',
			component: () => import('../views/console/pages/audio.vue')
		}, {
			path: 'avatar',
			name: 'Avatar',
			component: () => import('../views/console/pages/avatar.vue')
		}, {
			path: 'video',
			name: 'Video',
			component: () => import('../views/console/pages/video.vue')
		}, {
			path: 'template',
			name: 'Template',
			component: () => import('../views/console/pages/template.vue')
		}, {
			path: 'voicegallery',
			name: 'Voicegallery',
			component: () => import('../views/console/pages/voicegallery.vue')
		}]
	}, {
		path: 'editor',
		name: 'DefaultEditor',
		component: Editor,
	}, {
		path: 'editor/:pid',
		name: 'Editor',
		component: Editor,
	}, {
		path: 'editor/:pid/:logid',
		name: 'EditorLog',
		component: Editor,
	}]
}]


const router = createRouter({
	history: createWebHistory(),
	routes: generalRoutes
})

export default router