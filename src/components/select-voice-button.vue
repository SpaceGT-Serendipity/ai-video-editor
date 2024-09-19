<template>
	<el-button text bg class="model" :class="{'show':show}" :title="voice">
		<el-icon size="24">
			<font-awesome-icon icon="fa-solid fa-headset" />
		</el-icon>
		<div class="user">
			<div class="user-name">{{voice}}</div>
			<div class="hint">切换声音</div>
		</div>
	</el-button>
</template>

<script setup>
	const props = defineProps({
		voice: String,
		show: {
			type: Boolean,
			default: true
		}
	})
</script>

<style scoped>
	.model {
		height: 50px;
		opacity: 0;
		transition: opacity 0.2s;
	}

	.model.show {
		opacity: 10;
	}

	.model .el-icon {
		margin-right: 15px;
	}

	.model .user {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 12px;
	}

	.model .user .user-name {
		max-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.model .hint {
		font-size: 10px;
		color: #888a;
	}
</style>