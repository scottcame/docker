# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Copyright 2018  Cascadia Analytics LLC

# Dockerfile for an image that runs the included node-based container health-checker

# Notes:

#   1. Make sure to mount the host's Docker socket into the container (see example below)
#   2. Set the environment variable HEALTH_CHECK_INTERVAL to set the check interval (by default it's every 10 seconds)
#   3. Set the environment variable VERBOSE as needed (default is false)
#   4. Set a label of health-checker-monitor=true on any containers you want checked

# Example
# -------

# Run a container to be checked:

# $: docker run --name apache -d -p 80:80 --health-cmd 'curl -Sf http://localhost/index.html > /dev/null 2>&1' \
#   --net common \
#   --health-start-period 5s --health-interval 5s \
#   --label health-checker-monitor=true httpd-with-curl

# Run health-checker:

# $: docker run -d --name health-checker -v /var/run/docker.sock:/var/run/docker.sock -e HEALTH_CHECK_INTERVAL=2000 scottcame/health-checker

FROM node:8-alpine

ENV HEALTH_CHECK_INTERVAL 10000
ENV VERBOSE false

RUN mkdir -p /health-checker

COPY files/* /health-checker/

WORKDIR /health-checker

RUN npm install --save

CMD node index.js -i ${HEALTH_CHECK_INTERVAL} -v ${VERBOSE}
