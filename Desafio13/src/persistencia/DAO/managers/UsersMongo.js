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

    async findById(id){
        try {
            const user = await userModel.findById(id);
            return user;
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

    async deleteOne(id){
        const userDeleted = await userModel.findByIdAndDelete(id);
        return userDeleted;
    }

    async update(email, objUpd){
        try {
            const userUpdated = await userModel.findOneAndUpdate({email}, objUpd, { new: true });
            return userUpdated;
        } catch (error) {
            return error;
        }
    }
}

export const usersMongo = new UsersMongo();