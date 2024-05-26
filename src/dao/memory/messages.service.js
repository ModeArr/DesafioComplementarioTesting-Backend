import { find, create } from '../../models/messages.model'

class MessagesServiceManager {

    async getAllMessages() {
        try {
            const allMessages = await find({}).lean()
            return allMessages
        } catch (error) {
            throw Error(error)
        }
    }

    async addMessage(message, user){
        try {
            const messageAdd = await create({user: user, message: message})
            .then((res) => {
                return res 
            })
            .catch((error) => {
                throw Error(error)
            })

            return messageAdd
        } catch (error) {
            throw Error(error)
        }
    }
}

export default MessagesServiceManager