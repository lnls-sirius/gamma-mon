#!/bin/sh
curl -k 'https://10.0.38.42/retrieval/bpl/getMatchingPVs?pv=BO*CCG*Pressure-Mon&limit=4000' > src/static/BO-CCG.json
# curl -k 'https://10.0.38.42/retrieval/bpl/getMatchingPVs?pv=SI*CCG*Pressure-Mon&limit=4000' > src/static/SI-CCG.json
./getPV.py
curl -k 'https://10.0.38.42/retrieval/bpl/getMatchingPVs?pv=TB*CCG*Pressure-Mon&limit=4000' > src/static/TB-CCG.json
curl -k 'https://10.0.38.42/retrieval/bpl/getMatchingPVs?pv=TS*CCG*Pressure-Mon&limit=4000' > src/static/TS-CCG.json
