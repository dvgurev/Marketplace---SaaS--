import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import serviceRoutes from './routes/services';
import { PORT } from './config';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('OK');
});

// mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);

const port = PORT;
app.listen(port, () => {
  console.log(`Orchestrator running on port ${port}`);
});
