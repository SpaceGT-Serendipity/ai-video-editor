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
				{{globalStore.scale}}
			</div>
		</div>
		<div class="properties-block">
			<span class="block-name">分辨率</span>
			<div>
				{{globalStore.width}} x {{globalStore.height}}
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		useGlobalStore
	} from '../../store/global.js'
	
	const globalStore = useGlobalStore()
</script>

<style>
</style>