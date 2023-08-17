import { http } from '@/utils/http'

import type { PageParams } from '@/types'
import { HotResult } from '@/types/hot'

type HotParams = PageParams & { subType?: string }

export const getHotRecommendAPI = (url: string, data?: HotParams) => {
    return http<HotResult>({
        method: 'GET',
        url,
        data
    })
}
