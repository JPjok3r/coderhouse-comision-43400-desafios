import { ticketMongo } from "../persistencia/DAO/managers/TicketsMongo.js";

class TicketService {
  async createTicket(amount, userEmail) {
    let ticket = {
        code: this.#generateTicketCode(),
        purchase_datetime: Date.now(),
        amount: amount,
        purchaser: userEmail
    };
    try {
        const newTicket = await ticketMongo.createTicket(ticket);
        return newTicket;
    } catch (error) {
        return error;
    }  
  }

  #generateTicketCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
}

export const ticketService = new TicketService();