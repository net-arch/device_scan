// get_ips.ts
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';

export type IpMacPair = {
  ip: string;
  mac: string;
  serviceInfo: string;
  OS: string;
  vendor: string;
  type: string;
};

export async function getIps(): Promise<IpMacPair[]> {
  const ipMacPairs: IpMacPair[] = [];
  const arpOutput: string = execSync('arp -a').toString();

  let ipsTxtContent = '';  // ips.txtに書き込む内容を保持する変数

  for (const line of arpOutput.split('\n')) {
    const parts: string[] = line.split(' ');
    if (parts.length > 3) {
      const ip: string = parts[1].replace(/[()]/g, '');
      const mac: string = parts[3];
      const serviceInfo: string = parts[0];
      const OS: string = "unknown";  // OSの値を設定します。適切な値に修正してください。
      const vendor: string = "unknown";  // vendorの値を設定します。適切な値に修正してください。
      const type: string = "unknown";  // typeの値を設定します。適切な値に修正してください。
      if (!ipMacPairs.some(pair => pair.ip === ip)) {
        ipMacPairs.push({ ip, mac, serviceInfo, OS, vendor, type });
        ipsTxtContent += `${ip}\n`;  // ips.txtに書き込む内容を追加
      }
    }
  }

  // ips.txt ファイルに書き込み
  const ipsTxtPath = path.join(__dirname, 'results/ips.txt');
  writeFileSync(ipsTxtPath, ipsTxtContent);

  console.log(JSON.stringify(ipMacPairs, null, 2));  // for debug
  // JSON 形式でファイルに保存
  const resultPath = path.join(__dirname, 'results/result.json');
  writeFileSync(resultPath, JSON.stringify(ipMacPairs, null, 2));

  return ipMacPairs;
}