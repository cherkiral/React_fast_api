import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

API_KEY = 'RA7EI7B1HRXFBN14VQVQ3WYM488HVWVH8Q'
ENDPOINT_URL = 'https://api.etherscan.io/api'

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
@app.get("/get_last_transactions/{wallet_address}")
def get_last_transactions(wallet_address: str, number_of_transactions: int):
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
    tx_list = get_last_transactions(wallet_address, number_of_transactions)
    return {'data': tx_list}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)