/*

  node script to check the health of Docker containers on /var/run/docker.sock, restarting any that are found to be unhealthy.

  does not currently pass all configuration items from unhealthy container to the new one.  those items will be added as needed.
  the most common ones are currently passed.

  # # # #

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

  Copyright 2018 Cascadia Analytics LLC

*/

// to run this locally (e.g., in development) make sure to do:
//   npm install --save
// from the directory in which this script lives.  that will install the deps in node_modules.
// the docker build process does this at image build time, for the stuff that goes into the image.

var Docker = require("dockerode");
var args = require('args');

args.option('interval', 'How often to check containers', 10000);
args.option('verbose', 'Whether to be verbose', false);
args.config.version = false;

argVals = args.parse(process.argv);

var docker = new Docker(); // connects to docker socket at /var/run/docker.sock

var interval = argVals.interval;
var verbose = argVals.verbose;

console.log("Container health checker starting with interval of " + interval + " ms");

var pause = false;

(function cycle () {
    setInterval(function () {
      if (!pause) {
        docker.listContainers(function(err, cs) {
          containers = cs.filter(function(value) {
            return value.Labels['health-checker-monitor'];
          }).forEach(function(container) {
            container = docker.getContainer(container.Id);
            container.inspect(function (err, inspectResult) {
              let containerName = inspectResult.Name.replace("/", "");
              if (verbose) {
                console.log("Checking container " + inspectResult.Id + " (" + containerName + ")");
              }
              let status = inspectResult.State.Health.Status;
              if ('unhealthy' === status) {
                console.log("Container " + inspectResult.Id + " (" + containerName + ") is unhealthy, restarting...")
                pause = true;
                container.remove({ force: true }).then(function(container) {
                  docker.createContainer({
                    name: containerName,
                    Image: inspectResult.Config.Image,
                    Cmd: inspectResult.Config.Cmd,
                    Env: inspectResult.Config.Env,
                    Healthcheck: inspectResult.Config.Healthcheck,
                    Labels: inspectResult.Config.Labels,
                    HostConfig: {
                      NetworkMode: inspectResult.HostConfig.NetworkMode,
                      PortBindings: inspectResult.HostConfig.PortBindings,
                      Mounts: inspectResult.Mounts.map(function(v) {
                        return {
                          Type: v.Type,
                          Source: v.Source,
                          Target: v.Destination,
                          ReadOnly: !v.RW
                        };
                      })
                    }
                  }).then(function(container) {
                    return container.start().then(function(container) {
                      pause = false;
                    });
                  });
                });
              } else {
                console.log("Container " + inspectResult.Id + " (" + containerName + ") is healthy");
              }
            });
          });
        });
      }
    }, interval);
})();
