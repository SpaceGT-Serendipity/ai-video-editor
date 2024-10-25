import axios from "../axios/index.js";

export function getTokensQuantity() {
  return axios({
    url: import.meta.env.VITE_APP_CLOUD_SERVER + "/tokens/getTokensQuantity",
    method: "get",
  });
}

export function applyRedeemCode(code) {
  return axios({
    url: import.meta.env.VITE_APP_CLOUD_SERVER + "/tokens/applyRedeemCode",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      code,
    },
  });
}

export function expendTokens(quantity, message) {
  return axios({
    url: import.meta.env.VITE_APP_CLOUD_SERVER + "/tokens/expendTokens",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      quantity,
      message,
    },
  });
}
