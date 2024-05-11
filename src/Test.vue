<template>
	<div style="width: 500px;height: 500px;">
		<vue-draggable-resizable :parent="true" :x="10" :y="10" :h="100" :w="100" :on-drag="onDrag">
			<p>You cannot move me or resize me outside my parent.</p>
		</vue-draggable-resizable>
	</div>

</template>

<script setup>
	const onDrag = (x, y) => {
		console.log(x, y)
	}
</script>

<style>
</style>