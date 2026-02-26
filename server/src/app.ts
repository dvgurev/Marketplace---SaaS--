import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import serviceRoutes from './routes/services';
import servicePlanRoutes from './routes/servicePlans';
import subscriptionRoutes from './routes/subscriptions';
import tenantRoutes from './routes/tenants';
import paymentRoutes from './routes/payments';
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
app.use('/api/services/:serviceId/plans', servicePlanRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/payments', paymentRoutes);

export default app;
