import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { useAccountStore } from "./account.js";
import { useLayersDataStore } from "./layers.js";
import { useMenuStore } from "./menu.js";
import { useGlobalStore } from "./global.js";
import { job } from "../api/batch.js";
import { useSubtitleDataStore } from "./data/subtitle.js";
import { createSrt } from "../utils/srt.js";
import { upload, filePath } from "../api/file.js";

export const useGenerateStore = defineStore("generate", {
  state: () => ({
    loading: false,
  }),
  actions: {
    async compound() {
      const globalStore = useGlobalStore();
      const accountStore = useAccountStore();
      const layersDataStore = useLayersDataStore();
      const menuStore = useMenuStore();
      const subtitleDataStore = useSubtitleDataStore();
      if (!accountStore.account) {
        ElNotification({
          title: "请登录后重试。",
          type: "warning",
        });
        return;
      }
      if (
        parseInt(layersDataStore.videoTotalDuration / 1000) >
        accountStore.tokens.quantity
      ) {
        ElNotification({
          title: "墨豆点数不足请充值。",
          type: "warning",
        });
        return;
      }
      this.loading = true;
      let check = true;
      const options = {
        samplingRate: 44100,
        codeRate: "192k",
        width: 1920,
        height: 1080,
        codec: "libx264",
        fps: 25,
      };
      const units = [];
      if (layersDataStore.mainAudioLayer) {
        let time = 0;
        layersDataStore.mainAudioLayer.units.forEach((unit) => {
          if (time < unit.duration.left) {
            units.push({
              type: "main-audio-blank",
              duration: unit.duration.left - time,
            });
          }
          units.push({
            type: "main-audio",
            url: unit.resource.url,
            start: unit.duration.start,
            end: unit.duration.end,
            duration: unit.duration.duration,
          });
          time = unit.duration.right;
        });
        if (time < layersDataStore.videoTotalDuration) {
          units.push({
            type: "main-audio-blank",
            duration: layersDataStore.videoTotalDuration - time,
          });
        }
      }
      if (layersDataStore.mainVideoLayer) {
        let time = 0;
        layersDataStore.mainVideoLayer.units.forEach((unit) => {
          if (time < unit.duration.left) {
            units.push({
              type: "main-video-blank",
              duration: unit.duration.left - time,
            });
          }
          units.push({
            type: "main-" + unit.type,
            url: unit.resource.url,
            start: unit.duration.start,
            end: unit.duration.end,
            duration: unit.duration.duration,
            scale: {
              x: unit.scene.scale.x,
              y: unit.scene.scale.y,
            },
            overlay: {
              x: unit.scene.position.x,
              y: unit.scene.position.y,
            },
          });
          time = unit.duration.right;
        });
        if (time < layersDataStore.videoTotalDuration) {
          units.push({
            type: "main-video-blank",
            duration: layersDataStore.videoTotalDuration - time,
          });
        }
      }
      let layers = [...layersDataStore.layers];
      layers.reverse();
      layers.forEach((layer) => {
        if (
          layer.id != layersDataStore.mainVideoLayerId &&
          layer.id != layersDataStore.mainAudioLayerId
        ) {
          if (layer.type == "audio") {
            layer.units.forEach((unit) => {
              units.push({
                type: "audio",
                url: unit.resource.url,
                start: unit.duration.start,
                end: unit.duration.end,
                duration: unit.duration.duration,
                anchor: unit.duration.left,
              });
            });
          }
          if (layer.type == "video") {
            layer.units.forEach((unit) => {
              units.push({
                type: "video",
                url: unit.resource.url,
                start: unit.duration.start,
                end: unit.duration.end,
                duration: unit.duration.duration,
                anchor: unit.duration.left,
                scale: {
                  x: unit.scene.scale.x,
                  y: unit.scene.scale.y,
                },
                overlay: {
                  x: unit.scene.position.x,
                  y: unit.scene.position.y,
                },
              });
            });
          }
          if (layer.type == "image") {
            layer.units.forEach((unit) => {
              units.push({
                type: "image",
                url: unit.resource.url,
                duration: unit.duration.duration,
                anchor: unit.duration.left,
                scale: {
                  x: unit.scene.scale.x,
                  y: unit.scene.scale.y,
                },
                overlay: {
                  x: unit.scene.position.x,
                  y: unit.scene.position.y,
                },
              });
            });
          }
          if (layer.type == "figure") {
            layer.units.forEach((unit) => {
              if (unit.resource.audio == null) {
                ElNotification({
                  title: "请为数字人添加配音。",
                  type: "warning",
                });
                check = false;
              } else {
                units.push({
                  type: "figure-picture",
                  avatar: unit.resource.url,
                  audio: unit.resource.audio.url,
                  anchor: unit.duration.left,
                  scale: {
                    x: unit.scene.scale.x,
                    y: unit.scene.scale.y,
                  },
                  overlay: {
                    x: unit.scene.position.x,
                    y: unit.scene.position.y,
                  },
                });
              }
            });
          }
        }
      });
      options.units = units;
      if (
        (layersDataStore.mainVideoLayer &&
          layersDataStore.mainVideoLayer.units.length == 0) ||
        options.units.length == 0
      ) {
        ElNotification({
          title: "请添加图片或视频背景素材。",
          type: "warning",
        });
        check = false;
      }
      if (subtitleDataStore.visible && subtitleDataStore.data.length > 0) {
        const srtContent = createSrt(subtitleDataStore.data);
        const blob = new Blob([srtContent], {
          type: "text/plain;charset=utf-8",
        });
        const file = new File([blob], "spacegt.srt", { type: blob.type });
        const res = await upload(file, "ai-video/source/srt");
        options.subtitle = {
          url: filePath + res.url,
        };
      }
      if (check) {
        accountStore.expendTokens(
          parseInt(layersDataStore.videoTotalDuration / 1000),
          "合成视频"
        );
        const result = await job(
          "channel-synthesis-job",
          globalStore.title,
          options
        );
        if (result) {
          ElNotification({
            title: "视频合成作业已提交",
            type: "success",
          });
          menuStore.jobProgressDialogVisible = true;
        }
      }
      this.loading = false;
    },
  },
});
