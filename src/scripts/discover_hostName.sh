#!/bin/bash

# スクリプトのディレクトリを取得
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# 出力ファイルを初期化
> $DIR/results/results_dig.txt

# results/ips.txt の各行に対して dig コマンドを実行
while read ip; do
    dig -x $ip @224.0.0.251 -p 5353 +short >> $DIR/results/results_dig.txt &
done < $DIR/results/ips.txt

# すべてのバックグラウンドジョブが終了するのを待つ
wait