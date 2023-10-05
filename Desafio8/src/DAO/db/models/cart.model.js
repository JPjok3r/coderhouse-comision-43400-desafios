import mongoose from "mongoose";

const prodRefSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    quantity: {
        type: Number,
    }
});

const cartSchema = new mongoose.Schema({
  
  products: [ prodRefSchema
    /*{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      },
      quantity: {
        type: Number,
      },
    },*/
  ],
});

export const cartModel = mongoose.model('Carts', cartSchema);
