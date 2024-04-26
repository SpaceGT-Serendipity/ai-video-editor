<template>
	<div class="template">
		<p>模板</p>
		<el-scrollbar>
			<div class="list">
				<resource-sample v-for="i in 4"
					cover="https://mobvoi-digitalhuman-public.weta365.com/93284288ca624b63a4285036d200f390.jpeg"
					src="https://yigee-source.oss-cn-beijing.aliyuncs.com/ai-portal/introduce.mp4"
					title="带妆上阵"></resource-sample>
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