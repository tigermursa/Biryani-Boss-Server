import { ObjectId } from "mongoose";
import { TProduct } from "./product.interface";
import ProductModel from "./product.model";


//post
const createProductIntoDB = async (data: TProduct) => {
    const result = await ProductModel.create(data) //builtin static method using
    return result;
}


// getAll data (find)
const getAllProductsFromDB = async () => {
    const result = await ProductModel.find();
    return result;
}


// getSingle task (findOne)
const getSingleProductFromDB = async (id: string) => {
    const result = await ProductModel.findOne({ _id: id });
    return result;
}


// delete (updateOne)
const deleteProductFromDB = async (_id: string) => {
    const result = await ProductModel.updateOne({ _id }, { isDeleted: true });
    return result;
}


//is available stock (updateOne) ? ⚡
const isAvailableFromDB = async (_id: string) => {
    const product = await ProductModel.findById(_id);
    if (!product) {
        throw new Error("Product not found");
    }
    const newIsAvailable = !product.status;
    const result = await ProductModel.updateOne({ _id }, { status: newIsAvailable });
    return result;
}


//update  (updateOne)
const updateProductFromDB = async (_id: string | ObjectId, updatedData: Partial<TProduct>) => {
    try {
        const result = await ProductModel.updateOne({ _id }, { $set: updatedData });
        return result;
    } catch (error: any) {
        console.error("Error updating Current Product:", error.message);
        throw new Error("Error updating Product: " + error.message);
    }
};


export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    deleteProductFromDB,
    isAvailableFromDB,
    updateProductFromDB
}