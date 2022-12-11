import os
import requests

def lambda_handler(event, context):
    res = requests.get(os.environ.get('URL', 'https://amazon.co.jp'));
    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {
            "content-type": "text/html; charset=utf-8"
        },
        "body": res.text,
    }