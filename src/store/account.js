import {
	defineStore
} from 'pinia'

export const useAccountStore = defineStore('account', {
	state: () => ({
		id: null,
		name: null,
		account: null,
		email: null,
		authorities: null,
		avatar: null,
	}),
	persist: true,
	actions: {
		logout() {
			this.id = null
			this.name = null
			this.account = null
			this.email = null
			this.authorities = null
			this.avatar = null
		}
	},
})