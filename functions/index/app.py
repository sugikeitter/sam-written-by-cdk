import datetime
import os

import boto3
import requests

ddb_resource = boto3.resource('dynamodb')
tbl_counter = ddb_resource.Table(os.environ.get('DDB_TABLE'))

def lambda_handler(event, context):
    url = os.environ.get('URL', 'https://aws.amazon.com');
    dt_now = datetime.datetime.now()
    yyyymm = dt_now.strftime('%Y%m')
    tbl_counter.update_item(
        Key={
            'url': url,
            'yearAndMonth': yyyymm
        },
        UpdateExpression='ADD count = count + :num',
        ExpressionAttributeValues={
            ':num': {'N': 1}
        }
    )

    res = requests.get(url);
    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {
            "content-type": "text/html; charset=utf-8"
        },
        "body": res.text,
    }