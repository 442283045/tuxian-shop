import { http } from '@/utils/http'
import { ProfileDetail, ProfileParams } from '@/types/member'
// 获取个人信息

export const getMemberProfileAPI = () => {
    return http<ProfileDetail>({
        url: '/member/profile',
        method: 'GET'
    })
}

// 修改个人信息

export const postUpdateProfileAPI = (data: ProfileParams) => {
    return http<ProfileDetail>({
        url: '/member/profile',
        method: 'PUT',
        data
    })
}
