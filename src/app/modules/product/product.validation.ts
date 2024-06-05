import { z } from "zod";

// Schema for Drink type
const DrinkValidationZodSchema = z.object({
    image: z.string().url({ message: "Image must be a valid URL" }),
    name: z.string().min(1, { message: "Name must be at least 1 character long" }),
    price: z.number().nonnegative({ message: "Price must be a non-negative number" }),
});

// Schema for Product type
export const ProductValidationZodSchema = z.object({
    id: z.number().int().positive({ message: "ID must be a positive integer" }),
    name: z.string().min(1, { message: "Name must be at least 1 character long" }),
    category: z.string().min(1, { message: "Category must be at least 1 character long" }),
    description: z.string().min(1, { message: "Description must be at least 1 character long" }),
    image: z.string().url({ message: "Image must be a valid URL" }),
    priceSm: z.number().nonnegative({ message: "Small price must be a non-negative number" }),
    priceMd: z.number().nonnegative({ message: "Medium price must be a non-negative number" }),
    priceLg: z.number().nonnegative({ message: "Large price must be a non-negative number" }),
    isDeleted: z.boolean().default(false),
    status: z.boolean().default(false),
    drinks: z.array(DrinkValidationZodSchema),
});
