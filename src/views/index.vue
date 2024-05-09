<template>
	<!-- <el-tour v-model="open"> -->
	<el-container>
		<!-- <el-tour-step :target="ref1?.$el" title="Upload File"> -->
		<el-header>
			<!-- 头部 -->
			<Header />
		</el-header>
		<!-- </el-tour-step> -->
		<el-container>
			<el-aside>
				<!-- 资源库菜单 -->
				<Menu @click="resourceRef.load($event)" />
			</el-aside>
			<el-container class="workbench"  >
				<el-container ref="interiorRef" class="interior">
					<!-- 资源库 -->
					<Resource ref="resourceRef" />
					<WindowResize direction="row"></WindowResize>
					<div class="viewport-group">
						<!-- 视口 -->
						<Viewport />
						<WindowResize direction="row"></WindowResize>
						<!-- 属性面板 -->
						<PropertiesPanel />
					</div>
				</el-container>
				<WindowResize direction="column"></WindowResize>
				<!-- 轨道 -->
				<Track ref="trackRef" />
			</el-container>
		</el-container>
		<el-footer>
			<!-- 底部信息 -->
			<Footer></Footer>
		</el-footer>
		<!-- 资源拖动显示 -->
		<ResourceDragging ref="resourceDraggingRef"></ResourceDragging>
	</el-container>
	<!-- </el-tour> -->
</template>

<script setup>
	import WindowResize from '../components/window-resize.vue'
	import Header from './header.vue'
	import Footer from './footer.vue'
	import Menu from './menu/index.vue'
	import Resource from './resource/index.vue'
	import ResourceDragging from '../components/resource-dragging.vue'
	import Viewport from './viewport/index.vue'
	import PropertiesPanel from './properties-panel.vue'
	import Track from './track/index.vue'
	import {
		ref,
		onMounted
	} from 'vue'

	const ref1 = ref()
	const resourceRef = ref()
	const resourceDraggingRef = ref()
	const interiorRef = ref()
	const trackRef = ref()
	const open = ref(true)
 
</script>

<style scoped>
	.el-container {
		height: 100%;
		overflow: hidden;
	}

	.el-header {
		border-bottom: 1px solid var(--el-border-color);
	}

	.el-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.el-footer {
		border-top: 1px solid var(--el-border-color);
		height: 40px;
	}

	.el-aside {
		width: 80px;
		border-right: 2px solid var(--el-border-color);
	}

	.workbench {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.track {
		height: 35%;
		min-height: 200px;
	}

	.interior {
		display: flex;
		justify-content: space-between;
		height: 65%;
		min-height: 300px;

	}

	.interior .resource {
		width: 25%;
		min-width: 300px;
		max-width: 50%;
	}

	.interior .viewport-group {
		display: flex;
		width: 75%;
		min-width: 800px;
		flex: 1 1 0%;
	}

	.interior .viewport-group .viewport {
		width: 70%;
		min-width: 500px;
		flex: 1 1 0%;
	}

	.interior .viewport-group .properties-panel {
		width: 30%;
		min-width: 300px;
		max-width: 600px;
	}
</style>