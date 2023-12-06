import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
    },
    thumbnails: [
        {type: String}
    ],
    owner: {
        type: String,
        default: "admin"
    }
});

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model('Product', productSchema);