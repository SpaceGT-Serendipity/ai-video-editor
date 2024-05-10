<template>
	<div class="controller layer">
		<el-button link size="small">
			<el-icon size="16px">
				<View />
			</el-icon>
		</el-button>
		<el-button link size="small">
			<el-icon size="16px">
				<Hide />
			</el-icon>
		</el-button>
		<el-button link size="small">
			<el-icon size="16px">
				<Delete />
			</el-icon>
		</el-button>
	</div>
</template>

<script setup>
</script>

<style scoped>
	.controller.layer {
		display: flex;
		justify-content: center;
	}
</style>