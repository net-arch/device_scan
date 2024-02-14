import React, { useState, useEffect } from "react";
import IpMacPairCard from "./IpMacPairCard";

interface Result {
  ip: string;
  mac: string;
  vendor: string; // 追加
  OS: string; // 追加
  // Add other properties if needed
}

const onCardClick = () => {
  // ここで遷移を行います。具体的な方法はあなたのアプリケーションの設定によります。
};

const ScanResults = () => {
  const [ipCount, setIpCount] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true); // 追加

  useEffect(() => {
    fetch("http://localhost:3001/api/nmap")
      .then((response) => response.json())
      .then((results) => {
        console.log(results);
        setIpCount(results.ipCount);
        setResults(results.data);
        setLoading(false); // データがフェッチされたらローディング状態を更新
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="flex justify-center h-screen bg-gradient-to-r from-indigo-500 to-sky-500 flex-wrap">
      <div className="text-center w-full mt-4">
        <h1 className="text-white text-4xl">接続デバイス</h1> {/* ここを変更 */}
      </div>
      {loading ? (
        <div className="text-white text-2xl">読み込み中...</div> // ローディング中のメッセージを表示
      ) : (
        results &&
        results.map((result, index) => (
          <IpMacPairCard
            key={index}
            vendor={result.vendor}
            OS={result.OS}
            ip={result.ip} // 追加
            mac={result.mac} // 追加
            onCardClick={onCardClick}
          />
        ))
      )}
    </div>
  );
};

export default ScanResults;
