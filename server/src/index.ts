import app from './app';
import { PORT } from './config';

// server startup script simply imports the already configured express app
const port = PORT;
app.listen(port, () => {
  console.log(`Orchestrator running on port ${port}`);
});
