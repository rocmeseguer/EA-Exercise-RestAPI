import express, { RequestHandler } from 'express';
import cors from 'cors';

import userRoutes from './routes/user';
import todoRoutes from './routes/todo';

// Initializations
const app: express.Application = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(express.json() as RequestHandler);


// Routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

export default app;
