import { userModel } from "../db/models/user.model.js";

class UsersMongo{
    async createUser(user){
        try {
            const newUser = await userModel.create(user);
            return newUser;
        } catch (error) {
            return error;
        }
    }

    async findOne(email){
        try {
            const user = await userModel.findOne({email});
            return user;
        } catch (error) {
            return error;
        }
    }
}

export const usersMongo = new UsersMongo();