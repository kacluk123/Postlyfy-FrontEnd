import { mainApi } from '../../../axios-instances'
import { packLoginFormData } from './loginMapper'
import { UILoginFormData } from './loginTypes'
import { serverMessageUnpacker, UIServerMessages, serverMessagesResponse } from '../../common/errorDataUnpacker'

const createUserUrl = '/login'

export const login = async (payload: UILoginFormData) => {
    try {
        const { data } = await mainApi.post<serverMessagesResponse>(createUserUrl,  packLoginFormData(payload), {withCredentials: true})
        console.log(data)
        return data
    } catch (err) {
        return serverMessageUnpacker(err.response.data)
    }
}