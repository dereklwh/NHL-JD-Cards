# imports
import requests
import json
import numpy as np

print('Hi!')

base_url = 'https://api-web.nhle.com/v1/'
end_point = 'roster/VAN/current'

# API TEST
url = base_url + end_point
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    # Process the data as needed
else:
    print(f'Error: {response.status_code}')

print(data)

