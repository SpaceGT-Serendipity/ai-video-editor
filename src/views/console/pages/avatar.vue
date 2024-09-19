<template>
	<div>
		<h2 class="title">
			我的数字人形象
		</h2>
		<el-segmented v-model="value" :options="options" />
		<div v-if="value=='全部'" style="margin-top: 20px;">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in figureDataStore.privateData" :key="item.id"
						:data="item" :delFlag="true"></resource-sample>
				</div>
				<el-empty v-if="figureDataStore.privateData.length == 0" description="暂无形象"></el-empty>
			</el-scrollbar>
		</div>
		<div v-if="value=='静态'" style="margin-top: 20px;">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in figureDataStore.picturePrivateData" :key="item.id"
						:data="item" :delFlag="true"></resource-sample>
				</div>
				<el-empty v-if="figureDataStore.picturePrivateData.length == 0" description="暂无形象"></el-empty>
			</el-scrollbar>
		</div>
		<div v-if="value=='视频'" style="margin-top: 20px;">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in figureDataStore.videoePrivateData" :key="item.id"
						:data="item"></resource-sample>
				</div>
				<el-empty v-if="figureDataStore.videoePrivateData.length == 0" description="暂无形象"></el-empty>
			</el-scrollbar>
		</div>
		<div v-if="value=='动态'" style="margin-top: 20px;">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in figureDataStore.dynamicPrivateData" :key="item.id"
						:data="item"></resource-sample>
				</div>
				<el-empty v-if="figureDataStore.dynamicPrivateData.length == 0" description="暂无形象"></el-empty>
			</el-scrollbar>
		</div>
		<div v-if="value=='我的'" style="margin-top: 20px;">
			<el-scrollbar>
				<div class="list">
					<resource-sample v-for="item in figureDataStore.myPrivateData" :key="item.id"
						:data="item"></resource-sample>
				</div>
				<el-empty v-if="figureDataStore.myPrivateData.length == 0" description="暂无形象"></el-empty>
			</el-scrollbar>
		</div>
	</div>
</template>

<script setup>
	import ResourceSample from '../../../components/resource-sample.vue'
	import {
		ref,
		onMounted,
		watch
	} from 'vue'
	import {
		useAccountStore
	} from '../../../store/account.js'
	import {
		useFigureDataStore
	} from '../../../store/data/figure.js'

	const value = ref('全部')

	const options = ['全部', '静态', '视频', '动态', '我的']
	const figureDataStore = useFigureDataStore()
	const accountStore = useAccountStore()

	watch(() => accountStore.id, () => {
		figureDataStore.load()
	})

	onMounted(() => {
		figureDataStore.load()
	})
</script>

<style scoped>
	.el-segmented {
		--el-border-radius-base: 16px;
	}
</style>