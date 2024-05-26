import messagesModel from '../../models/messages.model.js'

class MessagesServiceManager {

    async getAllMessages() {
        try {
            const allMessages = await messagesModel.find({}).lean()
            return allMessages
        } catch (error) {
            throw Error(error)
        }
    }

    async addMessage(message, user){
        try {
            const messageAdd = await messagesModel.create({user: user, message: message})
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