import * as xml2js from 'xml2js';
import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

const currentDir = path.dirname(__filename);
const xmlFilePath = path.join(currentDir, 'results/results_nmap_O.xml');
const xml = readFileSync(xmlFilePath, 'utf-8');

xml2js.parseString(xml, (err: Error | null, result: any)  => {
  if (err) {
    throw err;
  }

  // XMLをJSON形式に変換し、新しいファイルに書き出す
  const jsonFilePath = path.join(currentDir, 'results/results_nmap_O.json');
  writeFileSync(jsonFilePath, JSON.stringify(result, null, 2));

  // 必要な情報だけを抽出する
  const jsonFile = require(jsonFilePath);
  const hosts: any[] = jsonFile.nmaprun.host;
  const hostList: { ipv4: string | null, mac: string | null, osmatch: string[] }[] = [];
  hosts.forEach((host: any) => {
    const ipv4Address = host.address.find((address: any) => address.$.addrtype === 'ipv4');
    const macAddress = host.address.find((address: any) => address.$.addrtype === 'mac');
    const osmatch = host.os && host.os[0].osmatch && host.os[0].osmatch[0].osclass
    ? host.os[0].osmatch[0].osclass.map((osclass: any) => osclass.$)
    : null;
    const hostInfo = {
      ipv4: ipv4Address ? ipv4Address.$.addr : null,
      mac: macAddress ? macAddress.$.addr : null,
      osmatch: osmatch,
    };
    hostList.push(hostInfo);
  });
  const newJson = {
    hosts: hostList
  };
  writeFileSync(jsonFilePath, JSON.stringify(newJson, null, 2));

  // 新しく作成したJSONファイルの内容を読み込み、コンソールに出力する
  const json = readFileSync(jsonFilePath, 'utf-8');
  console.log(json);
});