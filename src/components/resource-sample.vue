<template>
	<div class="resource-sample" ref="resourceSampleRef" v-loading="!data.loaded">
		<div class="card">
			<el-image :src="data.cover">
				<template #error>
					<div class="image-slot">
						<el-icon size="40">
							<Picture />
						</el-icon>
					</div>
				</template>
			</el-image>
			<div class="shade"></div>
			<a class="glightbox video" :href="data.url">
				<el-button link>
					<el-icon size="26">
						<View />
					</el-icon>
				</el-button>
			</a>
		</div>
		<div class="title">{{data.name}}</div>
	</div>
</template>

<script setup>
	import GLightbox from 'glightbox';
	import {
		useResourceDragStore
	} from '../store/resource.js'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'

	const props = defineProps({
		data: Object
	})
	const store = useResourceDragStore()
	const resourceSampleRef = ref()

	onMounted(() => {
		if (!props.data.loaded) {
			props.data.init()
		}
		GLightbox({
			type: props.data.type
		});

		let drop = false
		resourceSampleRef.value.addEventListener('mousedown', (event) => {
			drop = true
		})
		resourceSampleRef.value.addEventListener('mouseup', (event) => {
			drop = false
		})
		resourceSampleRef.value.addEventListener('mouseleave', (event) => {
			if (drop)
				store.data = props.data
			drop = false
		})
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
		cursor: all-scroll;
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
		width: 110%;
		height: 110%;
		opacity: 0;
		background: radial-gradient(#0006, #000a);
		border-radius: 5px;
		transition: height 0.2s, width 0.2s, opacity 0.2s;
	}

	.card .el-button {
		opacity: 0;
		transition: opacity 0.3s;
	}

	.card:hover .el-button {
		opacity: 1;
	}

	.card:hover .shade {
		opacity: 0.7;
	}

	.card:hover .el-image {
		width: 110%;
		height: 110%;
	}

	.card a {
		-webkit-user-drag: none;
	}

	.card .image-slot {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>