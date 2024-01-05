import TicketModel from '../models/ticketModel.js';

export default class TicketDao {
  getTickets(criteria = {}){
    return TicketModel.find(criteria)
  }

  createTicket(data) {
    return TicketModel.create(data);
  }
  
  updateTicket(tid, data) {
    return TicketModel.updateOne({ _id: tid }, { $set: data});
  }

  deleteTicket(tid) {
    return TicketModel.deleteOne({ _id: tid});
  }
}