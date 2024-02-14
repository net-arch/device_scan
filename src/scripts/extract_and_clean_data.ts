// 必要なモジュールをインポートします
import fs from 'fs'; // ファイルシステム操作のためのモジュール
import path from 'path'; // パス操作のためのモジュール
import parse from 'xml-parser'; // XML解析のためのモジュール

// 'temp_with_spaces.txt' ファイルを読み込み、その内容を 'data' に格納します
let data = fs.readFileSync('temp_with_spaces.txt', 'utf8');
// データを行ごとに分割します
let lines = data.split('\n');

// JSONオブジェクトのインターフェースを定義します
interface JsonObj {
  address?: any; // アドレス情報を格納するプロパティ
  osmatch?: any[]; // OSマッチ情報を格納するプロパティ
}

// 空のJSONオブジェクトを初期化します
let json: JsonObj = {};
// カウンターを初期化します
let count = 0;

// 結果を格納するディレクトリを定義します
let resultsDir = path.join(__dirname, 'results');

// 結果のディレクトリが存在しない場合、それを作成します
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir);
}

// results/result.json を読み込みます
let resultsJson = JSON.parse(fs.readFileSync(path.join(resultsDir, 'result.json'), 'utf-8'));

// データの各行を処理します
lines.forEach((line: string) => {
  // 行が空の場合、現在のJSONオブジェクトをファイルに書き込み、JSONオブジェクトをリセットします
  if (line.trim() === '') {
    // Androidが含まれているosmatch要素を探します
    let androidMatch = json.osmatch ? json.osmatch.find((osmatch: any) => osmatch.name.includes('Android')) : null;
    if (androidMatch) {
      // Androidが含まれている場合、その要素のみを保持します
      json.osmatch = [androidMatch];
    } else if (json.osmatch && json.osmatch.length > 0) {
      // Androidが含まれていない場合、最初の要素のみを保持します
      json.osmatch = [json.osmatch[0]];
    }

    // json.address.addr を全て小文字にし、各部分の先頭にある0を削除します
    if (json.address && json.address.addr) {
      json.address.addr = json.address.addr.toLowerCase().replace(/:0+/g, ':').replace(/^0+/, '');
    }

    fs.writeFileSync(path.join(resultsDir, `result_nmap_O_${count}.json`), JSON.stringify(json));
    console.log(`Writing to file result_nmap_O_${count}.json`); // 追加
    console.log(`mac: ${json.address ? json.address.addr : 'N/A'}, osmatch.name: ${json.osmatch ? json.osmatch[0].name : 'N/A'}, vendor: ${json.address ? json.address.vendor : 'N/A'}`); // 追加

    // results/result.json の mac が一致する要素を探します
    let matchingResultIndex = resultsJson.findIndex((result: any) => result.mac === (json.address ? json.address.addr : null));
    if (matchingResultIndex !== -1) {
      // 一致する要素がある場合、その要素を新しい形式に変換します
      resultsJson[matchingResultIndex] = {
        ...resultsJson[matchingResultIndex],
        OS: json.osmatch ? json.osmatch[0].name : "Unknown",
        vendor: json.address ? json.address.vendor : "Unknown"
      };
      console.log(`Matching result: ${JSON.stringify(resultsJson[matchingResultIndex])}`);
    } else {
      // 一致する要素がない場合、何もしません
      console.log(`No matching result for mac: ${json.address ? json.address.addr : 'N/A'}`);
    }

    // JSONオブジェクトをリセットします
    json = {};
    count++;
    // 行が'<address'で始まる場合、それをアドレスとして解析し、JSONオブジェクトに追加します
  } else if (line.startsWith('<address')) {
    let obj = parse(line).root.attributes;
    json.address = obj;
    console.log(`Adding address: ${JSON.stringify(obj)}`); // 追加
    // 行が'<osmatch'で始まる場合、それをosmatchとして解析し、JSONオブジェクトに追加します
  } else if (line.startsWith('<osmatch')) {
    let obj = parse(line).root.attributes;
    if (!json.osmatch) {
      json.osmatch = [];
    }
    json.osmatch.push(obj);
    console.log(`Adding osmatch: ${JSON.stringify(obj)}, mac: ${json.address ? json.address.addr : 'N/A'}`); // 追加
  }
});
// 最後に、変更した内容を result.json に書き戻します
fs.writeFileSync(path.join(resultsDir, 'result.json'), JSON.stringify(resultsJson));