<template>
	<el-container>
		<el-header ref="headerRef">
			<!-- 头部 -->
			<Header>
				<el-button icon="Promotion" text @click="openTour=true">产品引导</el-button>
			</Header>
		</el-header>
		<el-container>
			<el-aside ref="menuRef">
				<!-- 资源库菜单 -->
				<Menu @click="resourceRef.load($event)" />
			</el-aside>
			<el-container class="workbench">
				<el-container class="interior">
					<!-- 资源库 -->
					<Resource ref="resourceRef" />
					<WindowResize direction="row"></WindowResize>
					<div class="viewport-group">
						<!-- 视口 -->
						<Viewport ref="viewportRef" />
						<WindowResize direction="row"></WindowResize>
						<!-- 属性面板 -->
						<properties ref="propertiesPanelRef"></properties>
					</div>
				</el-container>
				<WindowResize direction="column"></WindowResize>
				<!-- 轨道 -->
				<Track ref="trackRef">
				</Track>
			</el-container>
		</el-container>
		<el-footer ref="footerRef">
			<!-- 底部信息 -->
			<Footer></Footer>
		</el-footer>
		<!-- 资源拖动显示 -->
		<ResourceDragging ref="resourceDraggingRef"></ResourceDragging>
	</el-container>
	<el-tour v-model="openTour">
		<el-tour-step :target="headerRef?.$el" title="头部导航栏">
			可以设置项目名称，切换主题和语言，合成视频。
		</el-tour-step>
		<el-tour-step :target="menuRef?.$el" title="菜单栏" placement="right">
			可以在此处切换资源列表。
		</el-tour-step>
		<el-tour-step :target="resourceRef?.$el" title="资源列表">
			选择需要的素材拖入时间线中，可上传本地文件。
		</el-tour-step>
		<el-tour-step :target="viewportRef?.$el" title="效果视口">
			可在此处预览视频效果。
		</el-tour-step>
		<el-tour-step :target="propertiesPanelRef?.$el" title="属性面板">
			可以调整资源呈现效果。
		</el-tour-step>
		<el-tour-step :target="trackRef?.$el" title="时间线编辑器">
			将素材拖入时间线，开始编辑。
		</el-tour-step>
		<el-tour-step :target="footerRef?.$el" title="时间线编辑器">
			此处会显示操作提示，并且提供一些视频信息。
		</el-tour-step>
	</el-tour>
	<svg-library v-show="false"></svg-library>
	<loading-vue v-if="globalStore.loading"></loading-vue>
</template>

<script setup>
	import loadingVue from '../components/loading.vue'
	import WindowResize from '../components/window-resize.vue'
	import Header from './header.vue'
	import Footer from './footer.vue'
	import Menu from './menu/index.vue'
	import Resource from './resource/index.vue'
	import ResourceDragging from '../components/resource-dragging.vue'
	import Viewport from './viewport/index.vue'
	import Properties from './properties/index.vue'
	import Track from './track/index.vue'
	import SvgLibrary from '../components/svg-library.vue'
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useGlobalStore
	} from '../store/global.js'
	const globalStore = useGlobalStore()

	const headerRef = ref()
	const menuRef = ref()
	const resourceRef = ref()
	const resourceDraggingRef = ref()
	const viewportRef = ref()
	const propertiesPanelRef = ref()
	const trackRef = ref()
	const footerRef = ref()
	const openTour = ref(false)

	onMounted(() => {
		globalStore.switchTheme(globalStore.theme)
	})
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
		width: 380px;
		min-width: 380px;
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
		width: 400px;
		min-width: 400px;
		max-width: 600px;
	}
</style>