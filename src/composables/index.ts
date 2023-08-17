import { onMounted, ref } from 'vue'
import XtxGuess from '@/components/XtxGuess.vue'
export const useLoadData = () => {
    const guessRef = ref<InstanceType<typeof XtxGuess>>()

    onMounted(() => {
        guessRef.value?.getMore()
    })
    const loadMoreData = () => {
        guessRef.value?.getMore()
    }
    return { guessRef, loadMoreData }
}
