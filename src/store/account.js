import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  getTokensQuantity,
  expendTokens as expendTokensApi,
} from "../api/tokens.js";

export const useAccountStore = defineStore("account", () => {
  const info = ref({
    id: null,
    name: null,
    account: null,
    email: null,
    authorities: null,
    avatar: null,
  });

  const tokens = ref({
    quantity: 0,
  });

  const loadTokensinfo = async () => {
    tokens.value.quantity = await getTokensQuantity();
  };

  const expendTokens = (quantity, message) => {
    expendTokensApi(quantity, message).then((res) => {
      loadTokensinfo();
    });
  };

  return {
    info,
    tokens,
    id: computed(() => info.value.id),
    name: computed(() => info.value.name),
    account: computed(() => info.value.account),
    email: computed(() => info.value.email),
    authorities: computed(() => info.value.authorities),
    avatar: computed(() => info.value.avatar),
    loadTokensinfo,
    expendTokens,
  };
});
