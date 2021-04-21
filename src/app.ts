import express, { Application } from 'express';
const cors = require("cors");
import indexRoutes from './routes/index';

// Initializations
const app: Application = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middelwares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', indexRoutes);

export default app;
