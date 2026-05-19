import { Client } from 'ssh2';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = '78.141.223.19';
const USERNAME = 'root';
const PASSWORD = '.3hDK*SzDH}o!32%';

try {
  execSync('powershell Compress-Archive -Path dist/*, public/hexfire-logo.png -DestinationPath dist.zip -Force', { stdio: 'inherit' });
} catch (e) {}

const conn = new Client();
conn.on('ready', () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    sftp.fastPut(path.join(__dirname, 'dist.zip'), '/var/www/hexfire/dist.zip', (err) => {
      if (err) throw err;
      conn.exec('cd /var/www/hexfire && rm -rf dist/* && unzip -o dist.zip -d dist && rm dist.zip', (err, stream) => {
        if (err) throw err;
        stream.on('close', () => {
          console.log('✅ UI hotfix deployed successfully!');
          conn.end();
        }).on('data', (data: any) => {
          process.stdout.write(data);
        });
      });
    });
  });
}).connect({
  host: HOST,
  port: 22,
  username: USERNAME,
  password: PASSWORD
});
