// Import the 'express' library which is a web application framework for Node.js
import express from "express";


// Import the 'cors' library which allows handling Cross-Origin Resource Sharing
import cors from "cors";


// Create an instance of an Express application
const app = express();


// Middleware to parse JSON bodies from incoming requests
app.use(express.json());


// Middleware to enable CORS for all incoming requests
app.use(cors());


// Define application routes
// Uncomment the line below to use the StudentRoutes for handling routes starting with '/api/v1/students'
// app.use('/api/v1/students', StudentRoutes);


// Define a route for the root URL that sends a greeting message
app.get('/', (req, res) => {
    res.send('The Server Running');
});


// Export the Express app instance as the default export
export default app;


//? maintaining double space between lines