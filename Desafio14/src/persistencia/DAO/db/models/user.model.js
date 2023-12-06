import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Carts'
    },
    role: {
        type: String,
        enum: ["user", "admin", "premium"],
        default: "user"
    },
    documents: [
        {
            name: String,
            reference: String
        }
    ],
    last_conection: {
        status: String,
        date_time: Date
    },
    fromGithub: {
        type: Boolean,
        default: false
    },
    fromGoogle: {
        type: Boolean,
        default: false
    },
    recoveryPass: {
        type: Boolean,
        default: false
    },
    recoveryPassControl: {
        type: String
    }
});

export const userModel = mongoose.model('User', userSchema);