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

<script>
</script>

<style scoped>
	.controller.layer {
		display: flex;
		margin-bottom: 10px;
		justify-content: center;
	}

	.controller.layer:first-child {
		margin-top: 0px;
	}
</style>