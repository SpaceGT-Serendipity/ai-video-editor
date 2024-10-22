<template>
    <el-dialog v-model="dialogVisible" title="字幕显示时间段" width="500" align-center>
        <div class="rows">
            <div class="time-combination">
                <span>开始时间</span>
                <el-input-number v-model="startTime.hour" :controls="false" :max="99"></el-input-number> :
                <el-input-number v-model="startTime.minute" :controls="false" :max="60"></el-input-number> :
                <el-input-number v-model="startTime.second" :controls="false" :max="60"></el-input-number> .
                <el-input-number v-model="startTime.millisecond" controls-position="right" :max="999"></el-input-number>
            </div>
            <div class="time-combination">
                <span>结束时间</span>
                <el-input-number v-model="endTime.hour" :controls="false" :max="99"> </el-input-number> :
                <el-input-number v-model="endTime.minute" :controls="false" :max="60"></el-input-number> :
                <el-input-number v-model="endTime.second" :controls="false" :max="60"></el-input-number> .
                <el-input-number v-model="endTime.millisecond" controls-position="right" :max="999"></el-input-number>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLayersDataStore } from '../../../store/layers';
import { useSubtitleDataStore } from '../../../store/data/subtitle';

const emit = defineEmits(['change'])

const layersDataStore = useLayersDataStore()
const subtitleDataStore = useSubtitleDataStore()
const dialogVisible = ref(false)
const subtitleIndex = ref<number>(0)
const startTime = ref<{
    hour: number,
    minute: number,
    second: number,
    millisecond: number
}>({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
})
const endTime = ref<{
    hour: number,
    minute: number,
    second: number,
    millisecond: number
}>({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
})

const open = (data, index: number) => {
    dialogVisible.value = true
    subtitleIndex.value = index;
    startTime.value = subtitleDataStore.timeFormat(data.startTime);
    endTime.value = subtitleDataStore.timeFormat(data.endTime);
}

const submit = () => {
    emit('change', subtitleIndex, startTime, endTime)
    subtitleDataStore.setData(subtitleIndex, startTime, endTime)
    dialogVisible.value = false
}

defineExpose({
    open
})
</script>

<style scoped>
.rows {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

.time-combination {
    display: flex;
    gap: 10px;
    align-items: center;
}

.time-combination .el-input-number.is-without-controls {
    width: 60px;
}

.time-combination .el-input-number {
    max-width: 100px;
}
</style>