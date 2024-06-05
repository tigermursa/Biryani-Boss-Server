import { Request, Response } from "express";
import { handleZodErrorMessage } from "../../errors/handleZodErrorMessage";
import { ProductServices } from "./product.services";
import { ProductValidationZodSchema } from "./product.validation";
import ProductModel from "./product.model";

// Create
const createProduct = async (req: Request, res: Response) => {
    try {
        // Data will come into body
        const products = req.body;
        // Validate data
        const zodErrorData = ProductValidationZodSchema.safeParse(products);
        if (!zodErrorData.success) {
            // Zod error messages here
            const errorMessage = handleZodErrorMessage(zodErrorData.error);
            throw new Error(errorMessage);
        }
        const result = await ProductServices.createProductIntoDB(zodErrorData.data);
        // Sending response
        res.status(200).json({
            success: true,
            message: "Product Created Successfully!",
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: "Something went wrong with your input data!",
            error: err.message,
        });
    }
};


// Get-All Products
const getAllProducts = async (req: Request, res: Response) => {
    try {
        //pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const totalCount = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);

        const tasks = await ProductModel.find().skip(skip).limit(limit);

        res.status(200).json({
            success: true,
            message: "Data retrieved successfully grate ✔",
            data: {
                totalTasks: totalCount,
                totalPages: totalPages,
                currentPage: page,
                tasks: tasks,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error.message,
        });
    }
};


// Get One
const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const productID = req.params.id;
        const result = await ProductServices.getSingleProductFromDB(productID);
        //sending response 
        res.status(200).json({
            success: true,
            message: "single task retrieved successfully grate ✔ ",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: "something went wrong !!! ",
            error: error.message,
        })
    }
}

// Delete One
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productID = req.params.id;
        const result = await ProductServices.deleteProductFromDB(productID);
        //sending response 
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: "something went wrong !!! ",
            error: error.message,
        })
    }
}

// isAvailable
const isAvailable = async (req: Request, res: Response) => {
    try {
        const productID = req.params.id;
        const result = await ProductServices.isAvailableFromDB(productID);
        //sending response 
        res.status(200).json({
            success: true,
            message: "Product available now",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: "something went wrong !!! ",
            error: error.message,
        })
    }
}



//Update One
const updateProduct = async (req: Request, res: Response) => {
    try {
        const productID = req.params.id;
        const updatedData = req.body;
        const result = await ProductServices.updateProductFromDB(productID, updatedData);
        //sending response 
        res.status(200).json({
            success: true,
            message: "Product info updated successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "something went wrong while updating the Product",
            error: error.message,
        });
    }
};

//exporting
export const ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    isAvailable,
    updateProduct,
}
