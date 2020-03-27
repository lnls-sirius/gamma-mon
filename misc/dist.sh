#!/bin/bash
BASE=$(git rev-parse --abbrev-ref HEAD| tr a-z A-Z)
VERSION=$(grep \"version\" package.json|awk '{print $2}'|grep -Po '(?<=")(.*)(?=",)')
tar -zcv build/ -f $BASE.$VERSION.tar.gz
