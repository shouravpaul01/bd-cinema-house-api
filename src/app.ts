import express from 'express';
import cors from 'cors';
const app = express();

//Parser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  const a = 10;
  res.send('Hello World!');
});

export default app;
