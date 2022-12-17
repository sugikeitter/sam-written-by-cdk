# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `cdk synth --no-version-reporting --no-path-metadata --no-asset-metadata --no-staging --build='cat sam-globals.yaml' > template.yaml `       emits the synthesized CloudFormation template
* `sam build` / `sam build --use-container`
* `sam deploy` / `sam deploy --guided` / `sam deploy --no-execute-changeset --stack-name sam-written-by-cdk`
* `aws cloudformation list-change-sets --stack-name sam-written-by-cdk --output json`
* `aws cloudformation execute-change-set --change-set-name `aws cloudformation list-change-sets --stack-name sam-written-by-cdk --output text --query Summaries[0].ChangeSetId` --output json`

## Add Globals
Globals を追加したい場合、`synth` 前にコマンド実行できる `build` オプションでテキストを標準出力しておくことで、`synth` 結果をファイルへリダイレクトさせる時に合わせて冒頭に `template.yaml` へ差し込めるようにしておく (少し強引)
`cdk.json` にこちらを追記しておくか、
```diff:cdk.json
+   "build": "echo \"Globals:\n  Function:\n    Timeout: 10\n    Tracing: Active\n  Api:\n    TracingEnabled: true\n    EndpointConfiguration:\n      Type: REGIONAL\n    OpenApiVersion: 3.0.3\"",
    "context": {
```
`cdk` コマンド実行時のオプションに `--build` を利用する
```bash
--build='echo "Globals:\n  Function:\n    Timeout: 10\n    Tracing: Active\n  Api:\n    TracingEnabled: true\n    EndpointConfiguration:\n      Type: REGIONAL\n    OpenApiVersion: 3.0.3"
```

追記したい内容をファイルに保存しておき、 `--build 'cat file.txt'` で出力したものを `template.yaml` に書き出す
```bash
cdk synth --no-version-reporting --no-path-metadata --no-asset-metadata --no-staging --build='cat sam-globals.yaml' > template.yaml
```