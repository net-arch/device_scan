import { exec } from 'child_process';
import fs from 'fs';

export const scanNetwork = async () => {
  // Initialize files
  fs.writeFileSync('src/scripts/result.json', '');
  fs.writeFileSync('src/scripts/ips.txt', '');

  // Run arp -a command
  await new Promise((resolve, reject) => {
    exec('arp -a', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }

      // Write the output to ips.txt
      fs.writeFileSync('src/scripts/ips.txt', stdout);
      resolve(stdout);
    });
  });

  // Run nmap command
  await new Promise((resolve, reject) => {
    exec('nmap -sV -T4 -iL src/scripts/ips.txt', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }

      // Extract device information and write to result.json
      // This is a placeholder. You'll need to replace this with actual code to parse the nmap output.
      fs.writeFileSync('src/scripts/result.json', stdout);
      resolve(stdout);
    });
  });
};