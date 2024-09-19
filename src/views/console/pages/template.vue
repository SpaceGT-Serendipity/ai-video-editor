<template>
	<div>
		<h2 class="title">
			模板商店
		</h2>
		<el-segmented v-model="value" :options="options" />
		<el-empty description="暂无模板" />
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const value = ref('全部')

	const options = ['全部', '模板', '竖版']
</script>

<style scoped>
	.el-segmented {
		--el-border-radius-base: 16px;
	}
</style>