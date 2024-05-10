<template>
	<div class="resource">
		<component :is="currenComponent"></component>
	</div>
</template>

<script setup>
	import LoadingComponent from '../../components/loading-component.vue'
	import ErrorComponent from '../../components/error-component.vue'
	import {
		shallowRef,
		defineAsyncComponent
	} from 'vue'

	const currenComponent = shallowRef(null)

	const load = (data) => {
		currenComponent.value = defineAsyncComponent({
			loadingComponent: LoadingComponent,
			errorComponent: ErrorComponent,
			timeout: 5000,
			loader: () => import(/* @vite-ignore */`./${data.label}.vue`)
		});
	}

	defineExpose({
		load
	})
</script>

<style scoped>
	.resource {
		padding: 20px;
		box-sizing: border-box;
		height: 100%;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	
	.tabs {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.tabs .el-tabs__header {
		flex: 0 0 0%;
	}
	
	.tabs .el-tabs__content {
		flex: 1 1 0%
	}
	
	.tabs .el-tab-pane {
		height: 100%;
	}
</style>