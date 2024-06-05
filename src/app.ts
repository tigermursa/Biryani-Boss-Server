// Import the 'express' library which is a web application framework for Node.js
import express from "express";


// Import the 'cors' library which allows handling Cross-Origin Resource Sharing
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";


// Create an instance of an Express application
const app = express();


// Middleware to parse JSON bodies from incoming requests
app.use(express.json());


// Middleware to enable CORS for all incoming requests
app.use(cors());


// Define application routes

app.use('/api/v1/product', ProductRoutes);


// Define a route for the root URL that sends a greeting message
app.get('/', (req, res) => {
    res.send('The Briyani Boss Server Running');
});


// Export the Express app instance as the default export
export default app;


//? maintaining double space between lines