<template>
	<div class="timeline layer">
		<VueDraggable class="timeline draggable" ref="el" v-model="list">
			<layer-unit v-for="item in list" :key="item.id" :name="item.name" 
			:width="item.width" :color="item.color">
			</layer-unit>
		</VueDraggable>
	</div>
</template>

<script setup>
	import LayerUnit from './layer-unit.vue'
	import {
		ref
	} from 'vue'
	import {
		VueDraggable
	} from 'vue-draggable-plus'

	const list = ref([{
			name: 'Joao',
			id: 1,
			width: '200px',
			color: '#ffffff'
		},
		{
			name: 'Jean',
			id: 2,
			width: '400px',
			color: '#ffff00'
		},
		{
			name: 'Johanna',
			id: 3,
			width: '300px',
			color: '#ff00ff'
		},
		{
			name: 'Juan',
			id: 4,
			width: '100px',
			color: '#00ffff'
		}
	])
</script>

<style scoped>
	.timeline.layer {}

	.timeline .draggable {
		display: flex;
		height: 100%;
	}
</style>