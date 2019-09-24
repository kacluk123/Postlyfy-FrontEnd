import { mainApi } from '../../../axios-instances'
import { packSignupFormData } from './signupMapper'
import { UISignupFormData } from './signupTypes'
import { serverMessageUnpacker, UIServerMessages, serverMessagesResponse } from '../../common/errorDataUnpacker'

const createUserUrl = '/signup'

export const createUser = async (payload: UISignupFormData): Promise<UIServerMessages> => {
    try {
        const { data } = await mainApi.post<serverMessagesResponse>(createUserUrl, packSignupFormData(payload))
        return serverMessageUnpacker(data)
    } catch (err) {
        return serverMessageUnpacker(err.response.data)
    }
}