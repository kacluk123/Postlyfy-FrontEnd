import { mainApi } from '../../axios-instances'
import { getPostsPayload } from './postsTypes'

const getPostsUrl = '/get-posts'

export const getPosts = async (payload: getPostsPayload) => {
    try {
        const { data } = await mainApi.post(getPostsUrl, payload)
        return data
    } catch (err) {
        console.log(err)
    }
}