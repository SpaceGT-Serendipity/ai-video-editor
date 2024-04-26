<template>
	<div class="resource-sample">
		<div class="card">
			<el-image :src="cover"></el-image>
			<div class="shade"></div>
			<el-button link>
				<el-icon size="26">
					<CirclePlusFilled />
				</el-icon>
			</el-button>
			<a class="glightbox video" :href="src">
				<el-button link>
					<el-icon size="26">
						<View />
					</el-icon>
				</el-button>
			</a>
		</div>
		<div class="title">{{title}}</div>
	</div>
</template>

<script setup>
	import GLightbox from 'glightbox';
	import {
		onMounted
	} from 'vue'
	const props = defineProps({
		cover: String,
		src: String,
		title: String,
	})

	onMounted(() => {
		GLightbox();
	})
</script>

<style scoped>
	.title {
		font-size: 14px;
		color: var(--el-menu-text-color);
		margin: 6px 0;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 160px;
	}

	.card {
		position: relative;
		width: 160px;
		height: 90px;
		background-color: #666;
		display: flex;
		align-items: center;
		gap: 10px;
		justify-content: center;
		background-size: cover;
		border-radius: 5px;

	}

	.card .el-image {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 5px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: height 0.3s, width 0.3s;
	}

	.card .shade {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 105%;
		height: 105%;
		opacity: 0;
		background: radial-gradient(#0006, #000a);
		border-radius: 5px;
		transition: height 0.3s, width 0.3s, opacity 0.3s;
	}

	.card .el-button {
		opacity: 0;
		transition: opacity 0.3s;
	}

	.card:hover .el-button {
		opacity: 1;
	}

	.card:hover .shade {
		opacity: 1;
	}

	.card:hover .el-image {
		width: 105%;
		height: 105%;
	}
</style>