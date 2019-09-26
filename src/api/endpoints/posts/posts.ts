import { mainApi } from '../../axios-instances'
import { getPostsPayload } from './postsTypes'

const getPostsUrl = '/get-posts'
const addPostUrl = '/add-post'

export const getPosts = async (payload: getPostsPayload) => {
    try {
        const { data } = await mainApi.post(getPostsUrl, payload)
        return data
    } catch (err) {
        console.log(err)
    }
}

export const addPosts = async (payload) => {
    try {
        const { data } = await mainApi.post(addPostUrl, payload, { withCredentials: true })
    } catch (err) {
        console.log(err)
    }
}