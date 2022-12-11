import { Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as sam from 'aws-cdk-lib/aws-sam';
import { Construct } from 'constructs';

export class CdkSamStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ddb = new dynamodb.Table(this, 'MyTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    new sam.CfnFunction(this, 'MyFunction', {
      codeUri: 'sam-lambda/index/',
      handler: 'app.lambda_handler',
      runtime: 'python3.8',
      events: {
        api: {
          type: 'Api',
          properties: {
            method: 'GET',
            path: '/',
          }
        }
      },
      environment: {
        variables: {
          DDB_TABLE: ddb.tableName,
          URL: 'https://www.yahoo.co.jp'
        }
      }
    });
  }
}
