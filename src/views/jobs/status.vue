<template>
	<div :style="{
		'color': ['STARTED','STARTING','WAITING','TRIGGERING'].includes(status) ? '#4e8e2f': ['COMPLETED'].includes(status) ? '#3375b9': ['FAILED','STOPPED','STOPPED'].includes(status) ? '#b25252': 'initial'
	}">
		{{status}}
	</div>
</template>

<script setup>
	const props = defineProps({
		status: String
	})
</script>

<style>
</style>