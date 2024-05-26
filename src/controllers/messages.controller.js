import { messagesService } from "../repository/index.js";

const addMessageCtrl = async(req, res) => {
    const newMessage = req.body
    const io = req.app.get('io');

    messagesService.addMessage(newMessage.message, 
        newMessage.user
        )
        .then(result => {
            console.log(result)
            io.emit('message sent', result);
            return res.status(200).json(`Se subio correctamente el mensaje`);
        }).catch(err => {
            res.status(400).json(err.message)
        });
}


const getAllMessagesCtrl = async(req, res) => {
    messagesService.getAllMessages().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}

export {
    addMessageCtrl,
    getAllMessagesCtrl
}