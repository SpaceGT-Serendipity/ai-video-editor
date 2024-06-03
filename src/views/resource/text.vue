<template>
	<div class="text">
		<div class="header">
			<span>文本</span>
			<el-button text type="info">
				<el-icon>
					<font-awesome-icon icon="fa-solid fa-pen-ruler" />
				</el-icon>
				定制文本
			</el-button>
		</div>
		<el-scrollbar>
			<div class="list">
				<resource-text v-for="item in list" :key="item.name" :data="item"></resource-text>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import ResourceText from '../../components/resource-text.vue'
	import {
		ref,
		onMounted,
		computed
	} from 'vue'
	import {
		TextResource
	} from '../../bean/Resource.js'

	const list = ref([])
	
	const load = () => {
		list.value.push(new TextResource('默认文本'))
	}

	onMounted(() => {
		load()
	})
</script>

<style scoped>
	.text {

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
</style>