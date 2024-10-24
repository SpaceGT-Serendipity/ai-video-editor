import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAccountStore = defineStore("account", () => {
  const info = ref({
    id: null,
    name: null,
    account: null,
    email: null,
    authorities: null,
    avatar: null,
  });

  const logout = () => {
    info.value.id = null;
    info.value.name = null;
    info.value.account = null;
    info.value.email = null;
    info.value.authorities = null;
    info.value.avatar = null;
  };

  return {
    info,
    id: computed(() => info.value.id),
    name: computed(() => info.value.name),
    account: computed(() => info.value.account),
    email: computed(() => info.value.email),
    authorities: computed(() => info.value.authorities),
    avatar: computed(() => info.value.avatar),
    logout,
  };
});
