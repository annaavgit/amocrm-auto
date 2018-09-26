#!/bin/bash

env=$1

cd ..
cp .env .env.old
cp manifest.json manifest.old.json
cp .env.$env .env
cp manifest.$env.json manifest.json

mkdir -p build && zip -r build/widget.zip * -x build/**\* -x deploy/**\*

cd deploy
./uploadWidget.sh

cd ..
mv .env.old .env
mv manifest.old.json manifest.json