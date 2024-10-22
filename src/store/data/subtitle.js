import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { fromString } from "../../utils/srt";
const { Text, TextStyle } = PIXI;

const timeFormat = (millisecond) => {
  let hour = 0,
    minute = 0,
    second = 0;
  if (millisecond / 3600000 >= 1) {
    hour = parseInt(millisecond / 3600000);
    millisecond = millisecond % 3600000;
  }
  if (millisecond / 60000 >= 1) {
    minute = parseInt(millisecond / 60000);
    millisecond = millisecond % 60000;
  }
  if (millisecond / 1000 >= 1) {
    second = parseInt(millisecond / 1000);
    millisecond = millisecond % 1000;
  }

  return {
    hour,
    minute,
    second,
    millisecond,
    label: `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:${second.toString().padStart(2, "0")},${millisecond
      .toString()
      .padStart(3, "0")}`,
  };
};

const formatting = (str) => {
  const data = fromString(str);

  const newData = [];
  Object.keys(data).forEach((key, index) => {
    const frame = reactive(data[key]);
    frame.text = frame.text.replaceAll(" ", "");
    if (index > 0 && frame.text.length < 4 && newData.at(-1)) {
      newData.at(-1).text += frame.text;
      newData.at(-1).endTime = frame.endTime;
    } else {
      delete frame.number;
      newData.push(frame);
    }
  });
  return newData;
};

export const useSubtitleDataStore = defineStore("subtitle-data", () => {
  const visible = ref(true);
  const data = ref([]);

  const setData = (index, startTime, endTime) => {
    const one = data.value[index.value];

    if (one) {
      one.startTime =
        startTime.value.hour * 60 * 60 * 1000 +
        startTime.value.minute * 60 * 1000 +
        startTime.value.second * 1000 +
        startTime.value.millisecond;

      one.endTime =
        endTime.value.hour * 60 * 60 * 1000 +
        endTime.value.minute * 60 * 1000 +
        endTime.value.second * 1000 +
        endTime.value.millisecond;
    }
  };

  const loadTextContainers = (app, subtitle) => {
    if (subtitle.textContainers) {
      subtitle.textContainers.text = subtitle.text;
      subtitle.textContainers.x =
        app.canvas.clientWidth / 2 - subtitle.textContainers.width / 2;
    } else {
      const style = new TextStyle({
        fill: "#f8f8f8",
        fontSize: 50,
        stroke: { color: "#000000", width: 8, join: "round" },
      });
      const basicText = new Text({ text: subtitle.text, style });
      basicText.x = app.canvas.clientWidth / 2 - basicText.width / 2;
      basicText.y = app.canvas.clientHeight - 100;
      basicText.zIndex = 99;
      basicText.visible = false;
      app.stage.addChild(basicText);
      subtitle.textContainers = basicText;
    }
  };

  const stringify = computed(() => {
    return JSON.stringify(
      data.value.map((item) => {
        return {
          text: item.text,
          startTime: item.startTime,
          endTime: item.endTime,
        };
      })
    );
  });

  const clear = () => {
    data.value.forEach((item) => {
      if (item.textContainers) item.textContainers.destroy();
    });
    data.value = [];
  };

  return {
    visible,
    data,
    stringify,
    timeFormat,
    formatting,
    setData,
    loadTextContainers,
    clear,
  };
});
