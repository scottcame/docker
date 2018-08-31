#!/bin/bash
set -o errexit -o nounset -o pipefail

# Fix up the auth token in the jdbc connection configuration
if [ "$DW_TOKEN" == "<placeholder>" ]; then
  echo 'Run docker with --env DW_TOKEN="<your data.world auth token>"'
  exit 1
fi

sed -i "s/%DW_TOKEN%/$DW_TOKEN/" /usr/local/tomcat/shared/mondrian-connections.json

catalina.sh run
