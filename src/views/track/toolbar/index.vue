<template>
	<div class="toolbar">
		<div class="button-group-left">
			<history></history>
			<split></split>
		</div>
		<div class="button-group-right">
			<!-- <scale></scale> -->
		</div>
	</div>
</template>

<script setup>
	import History from './history.vue'
	import Split from './split.vue'
	import Scale from './scale.vue'

</script>

<style scoped>
	.toolbar {
		display: flex;
		justify-content: space-between;
		padding: 10px 20px;
		border-bottom: 1px solid var(--el-border-color);
		background-color: var(--track-toolbar-bg);
	}
</style>