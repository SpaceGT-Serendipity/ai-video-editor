<template>
	<el-dropdown @command="handleCommand">
		<el-button>{{activeSize.widthScale}} : {{activeSize.heightScale}}</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="item in sizeList" :command="item">{{item.widthScale}} :
					{{item.heightScale}}</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'


	const sizeList = [{
		widthScale: 21,
		heightScale: 9,
	}, {
		widthScale: 18,
		heightScale: 9,
	}, {
		widthScale: 16,
		heightScale: 9,
	}, {
		widthScale: 4,
		heightScale: 3,
	}, {
		widthScale: 1,
		heightScale: 1,
	}]
	const activeSize = ref(sizeList[2])


	const handleCommand = (data) => {
		activeSize.value = data;
	}
</script>

<style>
</style>