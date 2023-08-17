import { defineStore } from 'pinia'
import { AddressItem } from '@/types/address'
import { ref } from 'vue'

const useAddressStore = defineStore('address', () => {
    const selectedAddress = ref<AddressItem>()

    const changeSelectedAddress = (address: AddressItem) => {
        selectedAddress.value = address
    }

    return { selectedAddress, changeSelectedAddress }
})

export default useAddressStore
