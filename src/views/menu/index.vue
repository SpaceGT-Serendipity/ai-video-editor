<template>
	<div class="menu">
		<Item v-for="item in menuList" :label="item.label" :active="active==item.label" @click="active=item.label">
			{{item.title}}
		</Item>
	</div>
</template>

<script setup>
	import Item from './item.vue'
	import {
		ref
	} from 'vue'

	const menuList = [{
		path: '',
		label: 'template',
		title: '模板'
	}, {
		path: '',
		label: 'figure',
		title: '数字人'
	}, {
		path: '',
		label: 'text',
		title: '文本'
	}, {
		path: '',
		label: 'subtitle',
		title: '字幕'
	}, {
		path: '',
		label: 'image',
		title: '图片'
	}, {
		path: '',
		label: 'bgm',
		title: '背景音乐'
	}, {
		path: '',
		label: 'video',
		title: '视频'
	}]
	const active = ref('template')
</script>

<style scoped>
	.menu {
		padding-top: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>