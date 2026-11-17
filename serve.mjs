// Tiny static server: node serve.mjs  → http://<your-mac-ip>:8000
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { networkInterfaces } from 'node:os';
const dir = new URL('.', import.meta.url).pathname;
const port = +process.env.PORT || 8000;
http.createServer(async (req, res) => {
  try {
    const body = await readFile(dir + 'index.html');
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
    res.end(body);
  } catch (e) { res.writeHead(500); res.end(String(e)); }
}).listen(port, '0.0.0.0', () => {
  const ips = Object.values(networkInterfaces()).flat().filter((i) => i && i.family === 'IPv4' && !i.internal).map((i) => i.address);
  console.log(`Float Prompter running:\n  this Mac:  http://localhost:${port}\n` + ips.map((ip) => `  iPhone:    http://${ip}:${port}`).join('\n'));
});
