# sam-written-by-cdk

<img src="https://user-images.githubusercontent.com/8069859/209464380-a2252847-a51c-4a7f-8165-fedd044c53de.png" width="640px">
https://zenn.dev/sugikeitter/articles/sam-written-by-cdk

## 手順
1. [`aws-cdk-lib.aws_sam`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sam-readme.html) を使用して CDK でコードを書く
2. CDK が使用するメタデータなどをテンプレートに出力しないように、`./cdk.json` の編集と `cdk synth` 実行時にオプションを追加する
3. SAM 固有の [`Glabals` セクション](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/sam-specification-template-anatomy-globals.html) を使用できるように `./sam-globals.yaml` ファイルの作成と実行時オプションの `--build='cat sam-globals.yaml'` を組み合わせる
   - `aws-cdk-lib.aws_sam` は現時点で `Glabals` セクションに対応していないため
4. `cdk synth --no-staging --no-version-reporting --no-path-metadata --build='cat sam-globals.yaml' > template.yaml` で SAM テンプレートを出力
   - さらに `package.json` を修正して `npm run cdk2sam` で実施できるようにしておく
5. `sam build` & `sam deploy` でリソースをデプロイする
   - もちろん `sam local` でのテストや `sam sync` によるデプロイも可能

## CDK settings

- サンプルコード内の主要なファイル
```bash
.
├── bin
│   └── sam-written-by-cdk.ts       # CDK の App クラス
├── cdk.json                        # cdk synth の出力制御などオプション設定
├── functions                       # Lambda 関数のコードを配置するディレクトリ
│   └── index                       # 関数ごとに区切ったディレクトリ
│       ├── __init__.py
│       ├── app.py
│       └── requirements.txt
├── lib
│   └── sam-written-by-cdk-stack.ts # SAM リソースやその他 AWS リソース定義
├── package-lock.json
├── package.json
├── sam-globals.yaml                # Globals セクションの定義
└── template.yaml                   # cdk synth で出力した SAM テンプレート
```

- cdk.json の設定例
```diff
   "context": {
+    "@aws-cdk/core:newStyleStackSynthesis": false,
     "@aws-cdk/aws-lambda:recognizeLayerVersion": true,
```

- package.json の設定例
```diff
   "scripts": {
     "build": "tsc",
     "watch": "tsc -w",
     "test": "jest",
     "cdk": "cdk",
+    "cdk2sam": "cdk synth --no-staging --no-version-reporting --no-path-metadata --build='cat sam-globals.yaml'> template.yaml"
   },
```

- SAM テンプレートである `template.yaml` ファイル出力コマンド 😉
```bash
# template.yaml に SAM テンプレートの内容を書き出す
npm run cdk2sam
```

## AWS SAM useful commands

| Command | Note |
|---|---|
| `sam build --cached --use-container` | キャッシュを利用したビルド、コンテナランタイムがあれば Lambda 関数の言語ランタイムを気にせずビルドできる。 |
| `sam local invoke --debug	-e event.json [FUNCTION_LOGICAL_ID]` | Lambda 関数にイベント引数を渡してローカル実行。 |
| `sam local start-api --debug -p 3000` | API Gateway のエンドポイントをローカルで起動、ポート番号も選べる。 |
| `sam local start-lambda && aws lambda invoke --function-name "[FUNCTION_NAME]" --endpoint-url "http://127.0.0.1:3001" --no-verify-ssl out.txt` | SAM で定義した Lambda 関数を、別のコードのテストのため呼び出したい場合などに役立つ。詳細は [こちら](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-start-lambda.html) 。 |
| `sam deploy --no-execute-changeset` | 変更セットの実行はせず、変更内容の確認のみ。 |
| `sam sync --stack-name [STACK_NAME]` | SAM 以外のリソースも変更セットを作成せずにそのままデプロイできるので、開発環境で手早くデプロイしたい時に便利。 |
