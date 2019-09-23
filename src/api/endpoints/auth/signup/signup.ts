import { mainApi } from '../../../axios-instances'
import { packSignupFormData } from './signupMapper'
import { UISignupFormData } from './signupTypes'
import { serverMessageUnpacker } from '../../common/errorDataUnpacker'

const createUserUrl = '/signup'

export const createUser = async (payload: UISignupFormData) => {
    try {
        const { data } = await mainApi.post(createUserUrl, packSignupFormData(payload))
        return serverMessageUnpacker(data)
    } catch (err) {
        return serverMessageUnpacker(err.response.data)
    }
}