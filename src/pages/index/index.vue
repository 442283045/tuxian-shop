<script setup lang="ts">
//
import XtxSwiper from '@/components/XtxSwiper.vue'
import CustomNavBar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import XtxGuess from '@/components/XtxGuess.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import { getHomeBanner, getHomeCategory } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { onMounted, ref } from 'vue'
import { HomeCategory } from '@/types'
import { postLoginWxMinSimpleAPI } from '@/services/login'
const bannerList = ref<Array<{ id: number; imgUrl: string }>>([])
const categoryList = ref<HomeCategory>([])
/**
 * get home banner data
 */

const getHomeBannerData = async () => {
    const res = await getHomeBanner()
    bannerList.value = res.result
}
const getHomeCategoryData = async () => {
    const res = await getHomeCategory()
    categoryList.value = res.result
}
const guessRef = ref<InstanceType<typeof XtxGuess>>()
const getHomeGoodsGuessData = async (isFresh?: boolean) => {
    await guessRef.value?.getMore(isFresh)
}
// indicate whether the hot panel has been loaded
const isHotLoading = ref(true)
/**
 * listening hot panel load event
 */
const handleHotLoaded = () => {
    isHotLoading.value = false
}
// page loading status
const isLoading = ref(true)
// 用户进入首页时模拟登录
import { useMemberStore } from '@/stores'
import { addAddressAPI } from '@/services/address'
onLoad(async () => {
    await Promise.all([getHomeBannerData(), getHomeCategoryData()])
    // generate a eight number
    let random = '177' + Math.floor(10000000 + Math.random() * 90000000)
    const res = await postLoginWxMinSimpleAPI(random)
    const memberStore = useMemberStore()
    memberStore.setProfile(res.result)
    // 登录后添加测试收获地址
    addAddressAPI({
        address: '沈阳大街',
        cityCode: '110100',
        contact: random,
        countyCode: '110101',
        isDefault: 0,
        provinceCode: '110000',
        receiver: 'PDD'
    })
    isLoading.value = false
})
/**
 * get guess data
 * because we need invoke the component's method, so we can
 * only invoke it after the component has been mounted
 */
onMounted(() => {
    getHomeGoodsGuessData()
})
// 当前下拉状态
const isTriggered = ref(false)
/**
 * 自定义下拉刷新被触发
 */
const onRefresherrefresh = async () => {
    isTriggered.value = true
    await Promise.all([
        getHomeBannerData(),
        getHomeCategoryData(),
        getHomeGoodsGuessData(true)
    ])

    isTriggered.value = false
}
// get guess component instance
</script>

<template>
    <!-- custom navigator-->
    <CustomNavBar></CustomNavBar>
    <scroll-view
        :refresher-triggered="isTriggered"
        refresher-enabled
        scroll-y
        :style="{ flex: 1 }"
        @scrolltolower="getHomeGoodsGuessData()"
        @refresherrefresh="onRefresherrefresh"
    >
        <PageSkeleton v-if="isLoading || isHotLoading"></PageSkeleton>
        <!--  swiper component-->
        <view v-show="!isHotLoading && !isLoading">
            <XtxSwiper :bannerList="bannerList"></XtxSwiper>
            <CategoryPanel :categoryList="categoryList"></CategoryPanel>
            <HotPanel @haveLoaded="handleHotLoaded"></HotPanel>
            <XtxGuess ref="guessRef"></XtxGuess>
        </view>
    </scroll-view>
</template>

<style lang="scss">
//
page {
    background-color: #f7f7f7;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
