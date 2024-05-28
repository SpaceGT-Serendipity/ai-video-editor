<template>
	<el-dropdown @command="handleCommand">
		<el-button> 比例 {{activeSize}}</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="item in scaleList" :command="item">{{item}}</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useGlobalStore
	} from '../store/global.js'

	const globalStore = useGlobalStore()

	const scaleList = ['21:9', '16:9', '4:3', '2:1', '1:1', '3:4', '9:16']
	const activeSize = ref('16:9')

	const handleCommand = (data) => {
		activeSize.value = data;
		switch (data) {
			case '21:9':
				globalStore.width = 2520;
				globalStore.height = 1080;
				break;
			case '16:9':
				globalStore.width = 1920;
				globalStore.height = 1080;
				break;
			case '4:3':
				globalStore.width = 1440;
				globalStore.height = 1080;
				break;
			case '2:1':
				globalStore.width = 2160;
				globalStore.height = 1080;
				break;
			case '1:1':
				globalStore.width = 1080;
				globalStore.height = 1080;
				break;
			case '3:4':
				globalStore.width = 1080;
				globalStore.height = 1440;
				break;
			case '9:16':
				globalStore.width = 1080;
				globalStore.height = 1920;
				break;
		}
	}
</script>

<style>
</style>