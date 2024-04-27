<template>
	<div class="timeline ruler">
		<ruler-item width="300px" v-for="i in 10"></ruler-item>
	</div>
</template>
<script setup>
	import RulerItem from './ruler-item.vue'
</script>
<style scoped>
	.timeline.ruler {
		min-width: 100%;
		white-space: nowrap;
		overflow: hidden;
		z-index: 1;
	}
</style>