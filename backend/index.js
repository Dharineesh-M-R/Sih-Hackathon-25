import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import signupRoute from './routes/signup.js'; 
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
const corsOptions = {
  // Replace with the URL of your Next.js frontend
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api', signupRoute); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});