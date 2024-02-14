import express from 'express';
import cors from 'cors';
import { getIps } from '../scripts/get_ips';
import { nmapScan, countIPs } from '../scripts/nmap_scan';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());

const port = 3001;

app.get('/', async (req, res) => {
  const ipMacPairs = await getIps();
  res.json(ipMacPairs);
});

app.get('/api/nmap', async (req, res) => {
  const ipCount = await countIPs();
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../scripts/results/result.json'), 'utf-8'));
  res.json({ ipCount, data });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});