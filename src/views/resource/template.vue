<template>
	<div class="template">
		<p>模板</p>
		<el-scrollbar>
			<div class="list">
				 
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import ResourceSample from '../../components/resource-sample.vue'
</script>

<style scoped>
	.template {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	p {
		margin-top: 0;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: start;
		padding: 10px;
	}
</style>