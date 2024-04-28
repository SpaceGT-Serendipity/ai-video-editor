<template>
	<div class="flex">
		<div class="draggable" v-for="(item,index) in allList">
			<vue-draggable-resizable v-for="(item2,index2) in allList[index]" :axis="'x'" :x="index2 * 300" :h="40"
				:key="item2.id" class="cursor-move">
				{{ item2.name }}
			</vue-draggable-resizable>
		</div>
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		VueDraggable
	} from 'vue-draggable-plus'

	const allList = ref([
		[{
				name: 'Joao',
				id: '1'
			},
			{
				name: 'Jean',
				id: '2'
			},
			{
				name: 'Johanna',
				id: '3'
			},
			{
				name: 'Juan',
				id: '4'
			}
		],
		[{
				name: '2-Joao',
				id: '2-1'
			},
			{
				name: '2-Jean',
				id: '2-2'
			},
			{
				name: '2-Johanna',
				id: '2-3'
			},
			{
				name: '2-Juan',
				id: '2-4'
			}
		]
	])

	function onUpdate() {
		console.log('update')
	}

	function onAdd() {
		console.log('add')
	}

	function remove() {
		console.log('remove')
	}
</script>

<style scoped>
	.flex {
		background-color: #fff;
		color: #000000;
		display: flex;
		flex-direction: column;
		gap: 50px;
		height: 100%;
		text-align: center;
	}

	.draggable {
		width: 100%;
		height: 50px;
		background-color: #999;
	}
</style>