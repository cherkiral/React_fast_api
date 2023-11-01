import requests
from pprint import pprint

API_KEY = 'RA7EI7B1HRXFBN14VQVQ3WYM488HVWVH8Q'
ENDPOINT_URL = 'https://api.etherscan.io/api'


def get_last_transactions(address, amount):
    data = {
        'module': 'account',
        'action': 'txlist',
        'address': address,
        'page': 1,
        'offset': amount,
        'startblock': 0,
        'endblock': 27025780,
        'sort': 'desc',
        'apikey': API_KEY
    }

    r = requests.get(ENDPOINT_URL, params=data)
    responce = r.json()['result']
    return responce