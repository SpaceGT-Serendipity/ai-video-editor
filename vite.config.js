import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "dev.yigee.cn",
    port: 3001,
    https: {
      cert: fs.readFileSync("./cert/yigee.cn.pem"),
      key: fs.readFileSync("./cert/yigee.cn.key"),
    },
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
  },
  plugins: [vue()],
});
