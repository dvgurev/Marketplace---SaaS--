import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('OK');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Orchestrator running on port ${port}`);
});
