import srt from "srt";

export function fromString(string) {
  string = string.replaceAll("\r\n", "\n");
  return srt.fromString(string);
}

/**
 * data:[{text:'content',startTime:0,endTime:5000}]
 */
export function createSrt(data) {
  let srtText = "";
  data.forEach((item, index) => {
    const starTime = timeFormat(item.startTime);
    const endTime = timeFormat(item.endTime);

    srtText += `${index + 1}\n`;
    srtText += `${starTime} --> ${endTime}\n`;
    srtText += `${item.text}\n\n`;
  });
  return srtText;
}

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

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")},${millisecond
    .toString()
    .padStart(3, "0")}`;
};
