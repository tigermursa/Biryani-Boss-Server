import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";
import { UserRoutes } from "./app/modules/user/users.route";
import { AuthRoutes } from "./app/modules/auth/auth.route";

// Load environment variables from .env file
require('dotenv').config();

const app = express();

app.use(express.json());

// Middleware to enable CORS for all incoming requests with credentials
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        callback(null, true); // Allow all origins
    },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use('/api/v1/product', ProductRoutes); // Products
app.use('/api/v2/user', UserRoutes); // Users
app.use('/api/v3/user', AuthRoutes); // Login

app.get('/', (req: Request, res: Response) => {
    res.send('The Briyani Boss Server Running');
});

export default app;
