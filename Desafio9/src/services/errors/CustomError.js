export default class CustomError{
    static createError({name="Error", cause, message}){
        const error = new Error(message, { cause });
        error.name = name;
        throw error;
    }
}
