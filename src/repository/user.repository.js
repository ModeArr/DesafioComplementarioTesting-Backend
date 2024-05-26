export default class UserRepository {
    constructor(dao){
        this.dao = dao
    }

    checkUserAndPass = async (email, password) => {
        return this.dao.checkUserAndPass(email, password)
    }

    addUser = async (first_name, last_name, email, age, password) => {
        //let newUser = new UserDTO(user)
        return this.dao.addUser(first_name, last_name, email, age, password)
    }

    checkUserID = async (id) => {
        return this.dao.checkUserID(id)
    }

    checkUser = async (email) => {
        return this.dao.checkUser(email)
    }

    changeUserPassword = async (token, newPass) => {
        return this.dao.changeUserPassword(token, newPass)
    }

    setResetLink = async (uid, token) => {
        return this.dao.setResetLink(uid, token)
    }

    checkResetLink = async (token) => {
        return this.dao.checkResetLink(token)
    }

    checkUserEmail = async (email) => {
        return this.dao.checkUserEmail(email)
    }

    togglePremium = async (uid) => {
        return this.dao.togglePremium(uid)
    }
}