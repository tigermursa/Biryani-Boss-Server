import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";


// Define the Drink schema
const DrinkSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Define the TProduct schema
const ProductSchema = new Schema<TProduct>({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    priceSm: {
        type: Number,
        required: true
    },
    priceMd: {
        type: Number,
        required: true
    },
    priceLg: {
        type: Number,
        required: true
    },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    drinks: [DrinkSchema]
});

//Query middle wears to update delete boolean value:

ProductSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

ProductSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// the single value wont be available by aggregate by /hiding..(aggregate works on pipeline)
ProductSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // if not equal = true , don't come
    next();
});

// NEW STATIC METHOD
ProductSchema.statics.isProduct = async function (id: number): Promise<TProduct | null> {
    const existingUser = await this.findOne({ id });
    return existingUser;
};

const ProductModel = model<TProduct>("product", ProductSchema);
export default ProductModel;