# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

| Command | Note |
|---|---|
| `sam build --cached --use-container` | キャッシュを利用したビルド、コンテナランタイムがあれば Lambda 関数の言語ランタイムを気にせずビルドできる。 |
| `sam local invoke --debug	-e event.json [FUNCTION_LOGICAL_ID]` | Lambda 関数にイベント引数を渡してローカル実行。 |
| `sam local start-api --debug -p 3000` | API Gateway のエンドポイントをローカルで起動、ポート番号も選べる。 |
| `sam local start-lambda && aws lambda invoke --function-name "[FUNCTION_NAME]" --endpoint-url "http://127.0.0.1:3001" --no-verify-ssl out.txt` | SAM で定義した Lambda 関数を、別のコードのテストのため呼び出したい場合などに役立つ。詳細は [こちら](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-start-lambda.html) 。 |
| `sam deploy --no-execute-changeset` | 変更セットの実行はせず、変更内容の確認のみ。 |
| `sam sync --stack-name [STACK_NAME]` | SAM 以外のリソースも変更セットを作成せずにそのままデプロイできるので、開発環境で手早くデプロイしたい時に便利。 |
