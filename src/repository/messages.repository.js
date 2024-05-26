export default class MessagesRepository {
    constructor(dao){
        this.dao = dao
    }

    getAllMessages = async() => {
        return this.dao.getAllMessages()
    }

    addMessage = async(message, user) => {
        return this.dao.addMessage(message, user)
    }
}