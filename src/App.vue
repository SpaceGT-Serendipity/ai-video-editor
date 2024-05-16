<script setup>
	import ScreenSizeTips from './components/screen-size-tips.vue'
	import BoundaryTips from './components/boundary-tips.vue'
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useResourceDragStore
	} from './store/resource.js'

	const screenSizeTips = ref(false)
	const boundaryTipsRight = ref(false)
	const boundaryTipsBottom = ref(false)
	const resourceDragstore = useResourceDragStore()

	const updateScreenSizeTips = () => {
		if (window.innerWidth < 800 || window.innerHeight < 600) screenSizeTips.value = true
		else screenSizeTips.value = false
	}
	const updateBoundaryTips = () => {
		const app = document.querySelector('#app')
		if (app.clientWidth > window.innerWidth + 20) boundaryTipsRight.value = true
		else boundaryTipsRight.value = false
		if (app.clientHeight > window.innerHeight + 20) boundaryTipsBottom.value = true
		else boundaryTipsBottom.value = false
	}
	updateScreenSizeTips()
	updateBoundaryTips()
	window.addEventListener('resize', updateScreenSizeTips)
	window.addEventListener('resize', updateBoundaryTips)

	onMounted(() => {
		document.addEventListener('mouseup', (event) => resourceDragstore.data = null)
		document.addEventListener('mouseleave', (event) => resourceDragstore.data = null)
	})
</script>

<template>
	<BoundaryTips :right="boundaryTipsRight" :bottom="boundaryTipsBottom"></BoundaryTips>
	<ScreenSizeTips v-if="screenSizeTips"></ScreenSizeTips>
	<router-view v-else></router-view>
</template>

<style>
	@import "vue-draggable-resizable/style.css";
	@import 'glightbox/dist/css/glightbox.min.css';

	html {
		background-color: var(--el-bg-color);
	}

	body {
		margin: 0;
		overflow: hidden;
	}

	#app {
		width: 100vw;
		height: 100vh;
		min-width: 1200px;
		min-height: 700px;
		user-select: none;
	}
	
	.debug-open .debug {
		display: flex !important;
	}

	.debug {
		display: none !important;
		width: max-content;
		font-size: 12px;
		padding: 2px 6px;
	}

	.debug.float {
		position: absolute;
	}

	
</style>