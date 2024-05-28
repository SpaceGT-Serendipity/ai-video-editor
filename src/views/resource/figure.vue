<template>
	<div class="figure">
		<div class="header">
			<span>数字人</span>
			<el-button text type="info">
				<el-icon>
					<font-awesome-icon icon="fa-solid fa-pen-ruler" />
				</el-icon>
				定制数字人
			</el-button>
		</div>
		<el-tabs model-value="全部" class="tabs">
			<el-tab-pane label="全部" name="全部">
				<el-scrollbar>
					<div class="list">
						<resource-sample v-for="item in list" :key="item.id" :data="item"></resource-sample>
					</div>
				</el-scrollbar>
			</el-tab-pane>
			<el-tab-pane label="静态" name="静态">
				<el-scrollbar>
					<div class="list">
						<resource-sample v-for="item in pictureList" :key="item.id" :data="item"></resource-sample>
					</div>
				</el-scrollbar>
			</el-tab-pane>
			<el-tab-pane label="视频" name="视频">
				<el-scrollbar>
					<div class="list">
						<resource-sample v-for="item in videoeList" :key="item.id" :data="item"></resource-sample>
					</div>
				</el-scrollbar>
			</el-tab-pane>
			<el-tab-pane label="动作" name="动作">
				<el-scrollbar>
					<div class="list">
						<resource-sample v-for="item in dynamicList" :key="item.id" :data="item"></resource-sample>
					</div>
				</el-scrollbar>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
	import ResourceSample from '../../components/resource-sample.vue'
	import {
		ref,
		onMounted,
		computed
	} from 'vue'
	import {
		loadFigure
	} from '../../api/resource.js'
	import {
		FigureResource
	} from '../../bean/Resource.js'

	const list = ref([])
	const pictureList = computed(() => list.value.filter(item => item.tag == 'picture'))
	const videoeList = computed(() => list.value.filter(item => item.tag == 'video'))
	const dynamicList = computed(() => list.value.filter(item => item.tag == 'dynamic'))

	const load = async () => {
		const res = await loadFigure()
		for (let i = 0; i < res.length; i++) {
			const figure = new FigureResource(res[i])
			list.value.push(figure)
		}
	}

	onMounted(() => {
		load()
	})
</script>

<style scoped>
	.figure {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.header {
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header .el-icon {
		margin-right: 5px;
	}

	.tabs {
		height: calc(100% - 42px);
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

	.list {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: start;
	}
</style>