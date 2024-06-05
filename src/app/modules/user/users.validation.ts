import { z } from "zod";

const UserValidationZodSchema = z.object({
    name: z.string().min(4, { message: "Name must be at least 4 characters long" }),
    email: z.string().email({ message: "Invalid email format" }),
    //! phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone format" }),
    phone: z.string(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).regex(
        /^(?=.*[A-Z])(?=.*\d).{8,}$/,
        { message: "Password must contain at least one uppercase letter and one digit" }
    ),
    isDeleted: z.boolean().default(false),
});

export default UserValidationZodSchema;
