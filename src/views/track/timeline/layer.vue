<template>
	<div class="timeline layer">
		<layer-unit :x="0" :w="200"></layer-unit>
		<layer-unit :x="100" :w="400"></layer-unit>
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
	.timeline.layer {
		position: relative;
		background-color: var(--layer-bg);
	}
</style>