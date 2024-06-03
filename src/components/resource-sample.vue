<template>
	<div class="resource-sample" ref="resourceSampleRef" v-loading="!data.loaded">
		<div class="card">
			<el-image :src="data.cover" fit="contain">
				<template #placeholder>
					<div class="image-slot">
						<el-icon size="20">
							<font-awesome-icon icon="fa-solid fa-spinner" spin-pulse />
						</el-icon>
					</div>
				</template>
				<template #error>
					<div class="image-slot">
						<el-icon size="40">
							<Picture />
						</el-icon>
					</div>
				</template>
			</el-image>
			<div class="shade"></div>
			<a class="glightbox" :href="data.url">
				<el-button link>
					<el-icon size="26">
						<View />
					</el-icon>
				</el-button>
			</a>
		</div>
		<div class="title">{{data.name}}</div>
		<div class="tag" v-if="data.tag">
			<el-tag type="info" effect="dark" v-if="data.tag=='picture'">
				静态
			</el-tag>
			<el-tag type="warning" effect="dark" v-if="data.tag=='video'">
				视频
			</el-tag>
			<el-tag type="warning" effect="dark" v-if="data.tag=='dynamic'">
				动作
			</el-tag>
		</div>
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
		onMounted,
		onBeforeUnmount
	} from 'vue'

	const props = defineProps({
		data: Object
	})
	const store = useResourceDragStore()
	const resourceSampleRef = ref()
	let drop = false

	function handleMousedown() {
		drop = true
	}

	function handleMouseup() {
		drop = false
	}

	function handleMouseleave() {
		if (drop)
			store.data = props.data
		drop = false
	}

	onMounted(() => {
		GLightbox({
			type: ['image', 'video'].includes(props.data.type) ? props.data.type : 'image'
		});

		resourceSampleRef.value.addEventListener('mousedown', handleMousedown)
		resourceSampleRef.value.addEventListener('mouseup', handleMouseup)
		resourceSampleRef.value.addEventListener('mouseleave', handleMouseleave)
	})

	onBeforeUnmount(() => {
		resourceSampleRef.value.removeEventListener('mousedown', handleMousedown)
		resourceSampleRef.value.removeEventListener('mouseup', handleMouseup)
		resourceSampleRef.value.removeEventListener('mouseleave', handleMouseleave)
	})
</script>

<style scoped>
	.resource-sample {
		position: relative;
	}

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
		background-color: var(--resource-card-bg);
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
		width: 100%;
		height: 100%;
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

	.card a {
		-webkit-user-drag: none;
	}

	.card .image-slot {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.4;
	}

	.tag {
		position: absolute;
		top: 4px;
		left: 4px;
	}
</style>