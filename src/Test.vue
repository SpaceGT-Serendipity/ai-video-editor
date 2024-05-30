<template>
	<div id="waveform">

	</div>
</template>

<script setup>
	import {
		onMounted
	} from 'vue'
	import WaveSurfer from 'wavesurfer.js'

	onMounted(() => {
		const wavesurfer = WaveSurfer.create({
			container: '#waveform',
			url: 'https://oss.file.yigee.cn/audio/7b5dc7dc-0f17-4851-a21b-c7057395da15.mp3',
			interact: false
		})
	})
</script>

<style>

</style>