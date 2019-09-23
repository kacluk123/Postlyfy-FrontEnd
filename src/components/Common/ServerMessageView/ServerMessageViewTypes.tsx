import { singleServerMessage } from '../../../api/endpoints/common/errorDataUnpacker'

export interface ServerMessageView {
    isError: boolean
    messages: string[] 
}