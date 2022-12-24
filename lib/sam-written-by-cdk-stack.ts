import { Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as sam from 'aws-cdk-lib/aws-sam';
import { Construct } from 'constructs';

export class Cdk2SamStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ddb = new dynamodb.Table(this, 'accessCounter', {
      partitionKey: {
        name: 'url',
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'yearAndMonth',
        type: dynamodb.AttributeType.STRING
      },
    });

    const restApi = new sam.CfnApi(this, 'RestApi', {
      stageName: 'dev',
      name: 'cdk2sam-api',
    });

    const lambdaGetItem = new sam.CfnFunction(this, 'IndexFunction', {
      functionName: 'cdk2sam-index',
      codeUri: 'functions/index/',
      handler: 'app.lambda_handler',
      runtime: 'python3.9',
      events: {
        api: {
          type: 'Api',
          properties: {
            restApiId: restApi.ref,
            method: 'GET',
            path: '/',
          }
        }
      },
      environment: {
        variables: {
          DDB_TABLE: ddb.tableName,
          URL: 'https://aws.amazon.com/jp/builders-flash/'
        }
      },
      policies: [
        {
          dynamoDbWritePolicy: {
            tableName: ddb.tableName,
          }
        }
      ]
    });
  }
}
