<template>
	<el-dropdown @command="handleCommand">
		<el-button>{{activeSpeed.toFixed(2)}} x</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="item in speedList" :command="item">{{item.toFixed(2)}} x</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	const speedList = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 3.0]
	const activeSpeed = ref(1.0)

	const handleCommand = (data) => {
		activeSpeed.value = data;
	}
</script>

<style>
</style>