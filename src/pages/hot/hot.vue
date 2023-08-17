// /src/pages/hot/hot.vue
<script setup lang="ts">
import { ref } from 'vue'
import { getHotRecommendAPI } from '../../services/hot'
import { SubTypeItem } from '@/types/hot'
// 热门推荐页 标题和url
const hotMap = [
    { type: '1', title: '特惠推荐', url: '/hot/preference' },
    { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
    { type: '3', title: '一站买全', url: '/hot/oneStop' },
    { type: '4', title: '新鲜好物', url: '/hot/new' }
]

// uniapp 获取页面参数
const query = defineProps<{
    type: string
}>()
// find the page which should be request
const pageInfo = hotMap.find((item) => item.type === query.type)
// have an error to set navigationBarTitle
// onLoad(() => {
//     uni.setNavigationBarTitle({
//         title: info!.title
//     })
// })
// recommand page cover image
const bannerPicture = ref('')
// sub components
const subTypes = ref<SubTypeItem[]>()

// active sub components

const activeIndex = ref(0)
const currentPage = ref<Map<number, number>>(new Map())

/**
 * Get the hot recommand data
 */
const getHotRecommendData = async () => {
    const res = await getHotRecommendAPI(pageInfo!.url)
    bannerPicture.value = res.result.bannerPicture
    subTypes.value = res.result.subTypes
    new Array(subTypes.value.length).fill(0).forEach((item, index) => {
        currentPage.value.set(index, 1)
    })
}
getHotRecommendData()
// have finished to load all data
const finish = ref(false)
// when touch the bottom to fetch more data
const getHotGoodsData = async () => {
    if (
        subTypes.value![activeIndex.value].goodsItems.pages ===
        currentPage.value.get(activeIndex.value)
    ) {
        finish.value = true
        uni.showToast({
            title: '没有更多了',
            icon: 'none'
        })
        return
    }
    currentPage.value.set(
        activeIndex.value,
        currentPage.value.get(activeIndex.value)! + 1
    )

    const res = await getHotRecommendAPI(pageInfo!.url, {
        page: currentPage.value.get(activeIndex.value),
        pageSize: 10,
        subType: subTypes.value![activeIndex.value].id
    })
    subTypes.value![activeIndex.value].goodsItems.items.push(
        ...res.result.subTypes[activeIndex.value].goodsItems.items
    )
    // subTypes.value = res.result.subTypes
}
/**
 * Refresh the page to reload the data
 */
const onRefresherrefresh = () => {}
</script>

<template>
    <view class="viewport">
        <!-- 推荐封面图 -->
        <view class="cover">
            <image :src="bannerPicture"></image>
        </view>
        <!-- 推荐选项 -->
        <view class="tabs">
            <text
                v-for="(item, index) in subTypes"
                :key="item.id"
                :class="{ active: index === activeIndex }"
                class="text"
                @tap="activeIndex = index"
                >{{ item.title }}</text
            >
        </view>
        <!-- 推荐列表 -->
        <scroll-view
            scroll-y
            class="scroll-view"
            v-for="(item, index) in subTypes"
            v-show="index === activeIndex"
            @scrolltolower="getHotGoodsData()"
            @refresherrefresh="onRefresherrefresh"
            :key="item.id"
        >
            <view class="goods">
                <navigator
                    hover-class="none"
                    class="navigator"
                    v-for="goods in item.goodsItems.items"
                    :key="goods.id"
                    :url="`/pages/goods/goods?id=${goods.id}`"
                >
                    <image class="thumb" :src="goods.picture"></image>
                    <view class="name ellipsis"
                        >不含酒精，使用安心爽肤清洁湿巾</view
                    >
                    <view class="price">
                        <text class="symbol">¥</text>
                        <text class="number">{{ goods.price }}</text>
                    </view>
                </navigator>
            </view>
            <view v-if="!finish" class="loading-text">正在加载...</view>
            <view v-if="finish" class="loading-text">没有更多了</view>
        </scroll-view>
    </view>
</template>

<style lang="scss">
page {
    height: 100%;
    background-color: #f4f4f4;
}
.viewport {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 180rpx 0 0;
    position: relative;
}
.cover {
    width: 750rpx;
    height: 225rpx;
    border-radius: 0 0 40rpx 40rpx;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
}
.scroll-view {
    flex: 1;
}
.tabs {
    display: flex;
    justify-content: space-evenly;
    height: 100rpx;
    line-height: 90rpx;
    margin: 0 20rpx;
    font-size: 28rpx;
    border-radius: 10rpx;
    box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
    color: #333;
    background-color: #fff;
    position: relative;
    z-index: 9;
    .text {
        margin: 0 20rpx;
        position: relative;
    }
    .active {
        &::after {
            content: '';
            width: 40rpx;
            height: 4rpx;
            transform: translate(-50%);
            background-color: #27ba9b;
            position: absolute;
            left: 50%;
            bottom: 24rpx;
        }
    }
}
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20rpx 20rpx;
    .navigator {
        width: 345rpx;
        padding: 20rpx;
        margin-top: 20rpx;
        border-radius: 10rpx;
        background-color: #fff;
    }
    .thumb {
        width: 305rpx;
        height: 305rpx;
    }
    .name {
        height: 88rpx;
        font-size: 26rpx;
    }
    .price {
        line-height: 1;
        color: #cf4444;
        font-size: 30rpx;
    }
    .symbol {
        font-size: 70%;
    }
    .decimal {
        font-size: 70%;
    }
}

.loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0 50rpx;
}
</style>
