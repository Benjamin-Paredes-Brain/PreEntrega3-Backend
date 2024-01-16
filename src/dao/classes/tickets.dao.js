import { ticketsModel } from "../models/tickets.model.js";

export default class Tickets {
    generateTicket = async (code, purchase_datetime, amount, purchaser) => {
        try {
            let result = await ticketsModel.create({
                code,
                purchase_datetime,
                amount,
                purchaser,
            });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    getTicketById = async (ticketId) => {
        try {
            const result = await ticketsModel.findById(ticketId);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
}
