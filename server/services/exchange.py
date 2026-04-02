def get_order_activity():
    return [
        {"id": 1, "coinId": "btc", "price": 100, "amount": 100, "total": 2, "type": "buy"},
        {"id": 2, "coinId": "btc", "price": 101, "amount": 101, "total": 1.5, "type": "sell"},
        {"id": 3, "coinId": "btc", "price": 99, "amount": 99, "total": 3, "type": "buy"},
    ]

def get_trade_activity():
    return [
        {"id": 1, "coinId": "eth", "price": 100, "amount": 100, "total": 2, "type": "buy"},
        {"id": 2, "coinId": "eth", "price": 54, "amount": 3, "total": 1.5, "type": "sell"},
        {"id": 3, "coinId": "smg", "price": 23, "amount": 2, "total": 3, "type": "buy"},
        {"id": 3, "coinId": "sol", "price": 77, "amount": 4, "total": 3, "type": "buy"},
    ]