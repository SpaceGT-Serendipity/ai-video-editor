<template>
	<div class="track">
		<toolbar></toolbar>
		<div class="view">
			<div class="track-group">
				<trackline v-for="i in 4"></trackline>
			</div>
			<div class="timeline-group">
				<timeline-ruler></timeline-ruler>
				<timeline v-for="i in 3"></timeline>
			</div>
		</div>
		<!-- 		<VueDraggable ref="el" v-model="list">
			<div v-for="item in list" :key="item.id">
				{{ item.name }}
			</div>
		</VueDraggable> -->
	</div>
</template>

<script setup>
	import Toolbar from './toolbar.vue'
	import Trackline from './trackline.vue'
	import Timeline from './timeline.vue'
	import TimelineRuler from './timeline-ruler.vue'
	import {
		ref
	} from 'vue'
	import {
		VueDraggable
	} from 'vue-draggable-plus'

	const list = ref([{
			name: 'Joao',
			id: 1
		},
		{
			name: 'Jean',
			id: 2
		},
		{
			name: 'Johanna',
			id: 3
		},
		{
			name: 'Juan',
			id: 4
		}
	])
</script>

<style scoped>
	.track {
		--timeline-ruler-height: 40px;
	}

	.view {
		display: flex;
	}

	.track-group {
		flex: 0 0 100px;
		display: flex;
		flex-direction: column;
		padding-top: var(--timeline-ruler-height);
	}

	.trackline {
		height: 50px;
		padding: 0 20px;
	}

	.timeline-group {
		flex: 1 1 0%;
		display: flex;
		flex-direction: column;
	}


	.timeline-ruler {
		height: var(--timeline-ruler-height);
		background-color: #666;
	}
</style>