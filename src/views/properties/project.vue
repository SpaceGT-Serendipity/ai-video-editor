<template>
	<div class="properties-project">
		<div class="properties-block">
			<span class="block-name">项目名称</span>
			<div>
				测试项目-5月21日
			</div>
		</div>
		<div class="properties-block">
			<span class="block-name">比例</span>
			<div>
				{{sceneStore.videoScale}}
			</div>
		</div>
		<div class="properties-block">
			<span class="block-name">分辨率</span>
			<div>
				{{sceneStore.width}} x {{sceneStore.height}}
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		useSceneStore
	} from '../../store/scene.js'
	
	const sceneStore = useSceneStore()
</script>

<style>
</style>