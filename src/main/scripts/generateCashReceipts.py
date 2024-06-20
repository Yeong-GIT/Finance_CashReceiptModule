from faker import Faker
import random
import requests

faker = Faker()

def generate_cash_receipt():
    receipt = {
        "customerName": faker.name(),
        "amount": round(random.uniform(10.0, 1000.0), 2),
        "receiptDate": faker.date_this_year().isoformat()
    }
    print("Generated Receipt:", receipt)
    return receipt

def post_cash_receipt():
    receipt = generate_cash_receipt()
    response = requests.post('http://cashreceipt-service:8080/api/receipts', json=receipt)
    print("Response:", response.json())
    return response.json()

if __name__ == "__main__":
    for _ in range(10):
        print(post_cash_receipt())
