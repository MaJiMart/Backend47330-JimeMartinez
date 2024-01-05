import { ticketRepository } from '../repositories/index.js';

export default class TicketService {
  static getTickets(filter = {}) {
    return ticketRepository.getTickets(filter);
  }

  static async createTicket(payload) {
    return await ticketRepository.createTicket(payload);
  }

  static updateTicket(tid, payload) {
    return ticketRepository.updateTicket(tid, payload);
  }

  static deleteTicket(tid) {
    return ticketRepository.deleteTicket(tid);
  }
}
