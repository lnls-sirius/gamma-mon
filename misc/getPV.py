#!/usr/bin/python3
import requests
import json

# url = 'https://10.0.38.42/retrieval/bpl/getMatchingPVs?pv=SI*CCG*Pressure-Mon&limit=400'
# "Being archived"
# connectionState "true"
url = 'https://10.0.38.42/mgmt/bpl/getPVStatus?pv=SI*CCG*Pressure-Mon&limit=4000'
fe = []
si = []
for data in requests.get(url, verify=False).json():
    if data['status'] == "Being archived":
        if data['connectionState'] == 'true':
            if 'FE' in data['pvName']:
                fe.append(data['pvName'])
            else:
                si.append(data['pvName'])

with open('src/static/SI-CCG.json', 'w+') as _f:
    json.dump(si, _f)

with open('src/static/FE-CCG.json', 'w+') as _f:
    json.dump(fe, _f)