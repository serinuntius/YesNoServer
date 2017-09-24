# glance グランス

## 開発メンバー
- 岡室庄悟 [okamuroshogo](https://github.com/okamuroshogo)
- 芹川葵 [serinuntius](https://github.com/serinuntius)
- 小島 コジコジ

## 構成
- [サーバー](https://github.com/serinuntius/YesNoServer)
- [iOSアプリ](https://github.com/okamuroshogo/YesNoApp)

## はじめに
- glance(グランス)は、yes/no枕を電子化しお互いのステータスが手元で確認できます。
- アプリアイコンにyes/noの表示が反映されるので、相手の気持ちを思いやることができます。

## 製品概要
- パートナーでアプリをインストールし、QRコードで登録し合うことで??お互いの距離を縮めることができる??
- アイコンでわかる

## 使用方法
1. QRコードでパートナーを登録する
2. 自分のステータスを変更する
3. 「ステータスを確認ボタン」を押すと、アプリアイコンにパートナーのステータスが反映される

## 特長
- 遠くにいても相手の気持ちを思いやることができます。
- 近年の日本の社会問題である、少子化や熟年層の離婚率の上昇を抑えることができます。

## 注力したこと（こだわり等）
- アイコンが変わるところ
- メンテナンスと運用コストを抑える

## 今後の展望
- push通知（今は手動取得）
- 10日間「no」から変更がないと、通知が来る


## 技術的情報
- ios10.3~ alternate icon
- serverless framework
	- aws lambda
	- aws dynamodb
	- aws api gateway

- nodejs express



