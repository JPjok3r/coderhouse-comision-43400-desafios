import { messagesModel } from "../db/models/messages.model.js";

class ChatMongo{
    async findAll(){
        try {
            const messages = await messagesModel.find({});
            return messages;
        } catch (error) {
            return error;
        }
    }

    async createOne(obj){
        try {
            const message = await messagesModel.create(obj);
            return message;
        } catch (error) {
            return error;
        }
    }
}

export const chatMongo = new ChatMongo();