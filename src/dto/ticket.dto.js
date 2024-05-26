import { v4 as uuidv4 } from 'uuid'

export default class TicketDTO {
    constructor(ticket){
        this.code = uuidv4(), 
        this.amount = ticket.totalAmount, 
        this.purchase_datetime = Date.now(), 
        this.purchaser = ticket.user.email
    }
}