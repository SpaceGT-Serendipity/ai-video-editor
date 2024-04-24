<template>
	<el-container>
		<el-header>
			<!-- 头部 -->
			<Header />
		</el-header>
		<el-container>
			<el-aside>
				<!-- 资源库菜单 -->
				<Menu />
			</el-aside>
			<el-container class="workbench">
				<el-container class="interior">
					<!-- 资源库 -->
					<ResourceLibrary />
					<!-- 视口 -->
					<Viewport />
					<!-- 属性面板 -->
					<PropertiesPanel />
				</el-container>
				<!-- 轨道 -->
				<Track />
			</el-container>
		</el-container>
		<el-footer>
			<!-- 底部信息 -->
			<Footer></Footer>
		</el-footer>
	</el-container>
</template>

<script setup>
	import Header from './header.vue'
	import Footer from './footer.vue'
	import Menu from './menu/index.vue'
	import ResourceLibrary from './resource-library.vue'
	import Viewport from './viewport/index.vue'
	import PropertiesPanel from './properties-panel.vue'
	import Track from './track.vue'
	import {
		ref
	} from 'vue'
</script>

<style scoped>
	.el-container {
		height: 100%;
	}

	.el-header {
		border-bottom: 2px solid var(--el-border-color);
	}

	.el-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.el-footer {
		border-top: 2px solid var(--el-border-color);
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

	.interior {
		display: flex;
		justify-content: space-between;
		flex: 65
	}

	.interior .resource-library {
		flex: 20;
	}

	.interior .viewport {
		border-left: 2px solid var(--el-border-color);
		border-right: 2px solid var(--el-border-color);
		flex: 60;
	}

	.interior .properties-panel {
		flex: 20;
	}

	.track {
		border-top: 2px solid var(--el-border-color);
		flex: 35
	}
</style>