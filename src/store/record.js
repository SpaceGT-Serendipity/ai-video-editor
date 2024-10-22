import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import Layer from "../bean/Layer.js";
import { save, logNewest, logOne } from "../api/project.js";
import { useLayersDataStore } from "./layers.js";
import { useGlobalStore } from "./global.js";
import { useAccountStore } from "./account.js";
import { useSubtitleDataStore } from "./data/subtitle.js";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";

export const useRecordStore = defineStore(
  "record",
  () => {
    const accountStore = useAccountStore();
    const globalStore = useGlobalStore();
    const layersDataStore = useLayersDataStore();
    const subtitleDataStore = useSubtitleDataStore();
    const route = useRoute();
    const router = useRouter();
    const dialogVisible = ref(false);
    const autosave = ref(true);
    const autosaveTime = ref(60 * 5); //5分钟
    const current = ref(null);
    const list = ref([]);
    const index = ref(0);
    const max = ref(30);
    const projectId = computed(() => route.params.pid);
    const logId = computed(() => route.params.logid);
    /* 撤回 */
    const undo = () => {
      if (index.value < list.value.length - 1) {
        index.value++;
        Deserialize(list.value[index.value]);
        current.value = list.value[index.value];
      }
    };
    const push = (data) => {
      current.value = data;
      list.value.unshift(data);
      index.value = 0;
    };
    const Deserialize = (data) => {
      const jsonData = JSON.parse(data);
      if (jsonData.layersData) {
        layersDataStore.clearAllLayer();
        JSON.parse(jsonData.layersData).forEach((layer) => {
          const layerObj = Layer.parse(layer);
          if (layerObj) {
            layersDataStore.addLayer(layerObj);
          }
        });
      }
      if(jsonData.subtitleData){
        subtitleDataStore.data = JSON.parse(jsonData.subtitleData);
      }
      dialogVisible.value = false;
    };
    const loadCurrent = async () => {
      list.value = [];
      index.value = 0;
      if (
        (projectId.value == null && logId.value == null) ||
        accountStore.id == null
      ) {
        if (current.value) {
          Deserialize(current.value);
        }
      } else {
        if (logId.value != null) {
          const res = await logOne(logId.value);
          Deserialize(res.data);
        } else {
          const res = await logNewest(projectId.value);
          Deserialize(res.data);
        }
      }
    };
    const loadProject = async (pid, logid) => {
      let log = null;
      if (logid) {
        log = await logOne(logid);
      } else {
        log = await logNewest(pid);
      }
    };
    const saveProject = () => {
      if (accountStore.id) {
        ElNotification({
          title: "项目已保存",
          type: "success",
        });
        current.value = layersDataStore.stringify;
        const data = {
          layersData: layersDataStore.stringify,
          subtitleData: subtitleDataStore.stringify,
        };
        save(projectId.value, globalStore.title, JSON.stringify(data)).then(
          (pid) => router.push("/editor/" + pid)
        );
      } else {
        ElNotification({
          title: "请登录后重试。",
          type: "error",
        });
      }
    };
    return {
      dialogVisible,
      autosave,
      current,
      list,
      index,
      max,
      undo,
      push,
      loadCurrent,
      loadProject,
      saveProject,
    };
  },
  {
    persist: true,
  }
);
