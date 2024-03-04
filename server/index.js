import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import invoiceRoutes from './routes/invoicesRoutes.js';
import soumissionRoutes from './routes/SoumissionRoutes.js';
import inspectionRoutes from './routes/inspectionRoutes.js';

const app = express();
app.use(bodyParser.json({ 'limit': '30mb', 'extended': true }));
app.use(bodyParser.urlencoded({ 'limit': '30mb', 'extended': true }));


function getAllowedOrigin(req) {
    const frontendDomain = process.env.FRONTEND_DOMAIN; // Get from environment variable
    if (frontendDomain) {
      return frontendDomain;
    } else {
      // Default to restrictive if not set (for local development)
      return 'http://localhost:3000';
    }
  }

const corsOptions = {
  origin: getAllowedOrigin,
  credentials: true, // Optional, to allow cookies
};

app.use(cors(corsOptions));


app.use('/invoices', invoiceRoutes);
app.use('/soumissions', soumissionRoutes);
app.use('/inspections', inspectionRoutes);



const dbURI = process.env.DATABASE_URL; // For local MongoDB
const port = 5000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch(err => console.error('Connection error:', err));

