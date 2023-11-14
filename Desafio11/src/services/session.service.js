import { usersMongo } from "../persistencia/DAO/managers/UsersMongo.js";
import UserDTO from "../persistencia/DTO/user.dto.js";

class SessionService{
    async currentSession(email){
        try {
            const user = await usersMongo.findOne(email);
            if(!user) throw new Error("Usuario no encontrado");
            const userDto = new UserDTO(user);
            return userDto;
        } catch (error) {
            return error;
        }
    }
}

export const sessionService = new SessionService();