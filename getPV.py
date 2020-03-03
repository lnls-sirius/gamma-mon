#!/usr/bin/python3
import requests
import json

url = 'https://10.0.38.42/retrieval/bpl/getMatchingPVs?pv=SI*CCG*Pressure-Mon&limit=400'
fe = []
si = []
for data in requests.get(url, verify=False).json():
    if 'FE' in data:
        fe.append(data)
    else:
        si.append(data)

with open('src/static/SI-CCG.json', 'w+') as _f:
    json.dump(si, _f)

with open('src/static/FE-CCG.json', 'w+') as _f:
    json.dump(fe, _f)