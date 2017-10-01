#!/bin/bash

# loads nominatim and tiger housenumber data (if available) from specified locations
# assumes source data lives in /nominatim-source-data, which will typically be mounted as a volume in Docker
# put any TIGER housenumber data in /nominatim-source-data/tiger

OSM_SOURCE_FILE=/nominatim-source-data/$1
TIGER_DIR=/nominatim-source-data/tiger

echo "Processing OSM file " $OSM_SOURCE_FILE

cd /Nominatim-3.0.1/build

mv settings/local.php settings/temp-local.php

./utils/setup.php --osm-file $OSM_SOURCE_FILE --all

./utils/imports.php --parse-tiger $TIGER_DIR
./utils/setup.php --import-tiger-data

echo "@define('CONST_Use_US_Tiger_Data', true);" >> settings/local.php

./utils/setup.php --create-functions --enable-diff-updates --create-partition-functions

mv settings/temp-local.php settings/local.php
