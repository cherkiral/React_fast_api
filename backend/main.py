from fastapi import FastAPI
from etherscan import get_transaction_amount
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/balance/{wallet_address}")
def get_balance(wallet_address: str):
    report = get_transaction_amount(wallet_address, 0)
    return {"wallet_address": wallet_address, 'amount': report['amount'], 'tokenName': report['tokenName']}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)