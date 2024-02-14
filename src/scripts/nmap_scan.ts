import { exec } from 'child_process';
import path from 'path';
import { writeFileSync, readFileSync, readFile } from 'fs';

export function nmapScan(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const command = 'nmap --privileged -A -T5 -iL results/ips.txt -oX results/result_nmap.xml';

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }

      const resultPath = path.join(__dirname, 'results/nmap_scan.txt');
      writeFileSync(resultPath, stdout);
      console.log(`stdout: ${stdout}`);  // for debug

      resolve();
    });
  });
}

export function countIPs(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const resultPath = path.join(__dirname, 'results/result.json');
    readFile(resultPath, 'utf8', (error, data) => {
      if (error) {
        console.error(`readFile error: ${error}`);
        reject(error);
      } else {
        try {
          const jsonData = JSON.parse(data);
          const ipCount = jsonData.length;
          console.log(`ipCount: ${ipCount}`);  // for debug
          resolve(ipCount);
        } catch (parseError) {
          console.error(`JSON parse error: ${parseError}`);
          reject(parseError);
        }
      }
    });
  });
}