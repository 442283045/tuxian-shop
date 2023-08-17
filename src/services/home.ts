import { http } from '@/utils/http'
import type {
    HomeCategory,
    HotItemList,
    PageResult,
    GuessItem,
    PageParams
} from '@/types/index'
/**
 * Get home banner
 * @param distributionSite 1:国内 2:国际
 */
export const getHomeBanner = (distributionSite = 1) => {
    return http<Array<{ id: number; imgUrl: string }>>({
        method: 'GET',
        url: '/home/banner',
        data: {
            distributionSite
        }
    })
}

/**
 * Get home category
 */
export const getHomeCategory = () => {
    return http<HomeCategory>({
        method: 'GET',
        url: '/home/category/mutli'
    })
}
/**
 * Get home hot recommand
 */
export const getHomeHot = () => {
    return http<HotItemList>({
        method: 'GET',
        url: '/home/hot/mutli'
    })
}
/**
 * Get home hot recommand
 */
export const getHomeGoodsGuessLikeAPI = (data?: PageParams) => {
    return http<PageResult<GuessItem>>({
        method: 'GET',
        url: '/home/goods/guessLike',
        data
    })
}
