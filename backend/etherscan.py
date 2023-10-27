import requests
from pprint import pprint

API_KEY = 'RA7EI7B1HRXFBN14VQVQ3WYM488HVWVH8Q'
ENDPOINT_URL = 'https://api.etherscan.io/api'


def get_transaction_amount(address, number):
    data = {
        'module': 'account',
        'action': 'tokentx',
        'address': address,
        'page': 1,
        'offset': 100,
        'startblock': 0,
        'endblock': 27025780,
        'sort': 'desc',
        'apikey': API_KEY
    }

    r = requests.get(ENDPOINT_URL, params=data)
    responce = r.json()['result'][number]
    decimal = int(responce['tokenDecimal'])
    value = int(responce['value'])
    tokenName = responce['tokenName']
    amount = round(value / (10 ** decimal), 4)
    return_dict = {
        'tokenName': tokenName,
        'amount': amount,
    }
    return return_dict