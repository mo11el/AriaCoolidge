// Express server entry point
import express from 'express';
import bodyParser from 'body-parser';
import { handleIncoming } from './telnyx.js';
import { startScheduler } from './scheduler.js';

const app = express();
app.use(bodyParser.json());

app.post('/webhook/telnyx', async (req, res) => {
  try {
    await handleIncoming(req.body);
    res.status(200).send('OK');
  } catch (e) {
    console.error('Webhook error', e);
    res.status(500).send('Error');
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AriaReply running on ${PORT}`);
  startScheduler();
});
