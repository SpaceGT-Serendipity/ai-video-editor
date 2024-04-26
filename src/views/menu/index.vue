<template>
	<el-scrollbar height="100%">
		<div class="menu">
			<Item v-for="item in menuList" :label="item.label" :active="active==item.label" @click="onClick(item)">
				{{item.title}}
			</Item>
		</div>
	</el-scrollbar>
</template>

<script setup>
	import Item from './item.vue'
	import {
		ref,
		onMounted
	} from 'vue'

	const emits = defineEmits(['click'])
	const menuList = [{
		label: 'template',
		title: '模板'
	}, {
		label: 'figure',
		title: '数字人'
	}, {
		label: 'text',
		title: '文本'
	}, {
		label: 'subtitle',
		title: '字幕'
	}, {
		label: 'image',
		title: '图片'
	}, {
		label: 'bgm',
		title: '背景音乐'
	}, {
		label: 'video',
		title: '视频'
	}]
	const active = ref('template')

	const onClick = (menu) => {
		active.value = menu.label
		emits('click', menu)
	}

	onMounted(() => {
		onClick(menuList[4])
	})
</script>

<style scoped>
	.menu {
		padding-top: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>