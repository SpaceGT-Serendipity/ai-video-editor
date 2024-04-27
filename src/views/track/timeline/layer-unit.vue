<template>
	<div class="timeline layer-unit" :style="{
		'width':props.width,
		'background-color': props.color
		}">
		{{name}}
	</div>
</template>

<script setup>
	const props = defineProps({
		name: String,
		width: String,
		color: String
	})
</script>

<style scoped>
	.timeline.layer-unit {
		height: 100%;
	}
</style>