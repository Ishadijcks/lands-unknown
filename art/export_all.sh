#!/bin/bash

shopt -s globstar
#rm -rf ../frontend/src/lib/assets

for f in **/*.aseprite ; do
    aseprite -b $f --save-as ../frontend/src/lib/assets/${f/aseprite/png}
done
