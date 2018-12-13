#### Docker image: health-checker

This image monitors specified (via label) containers for health, and when they get unhealthy, removes and re-creates them.

##### Usage:

`docker pull scottcame/health-checker`

Or pull the repo and from this directory:

`docker build -t health checker .`

Instructions on usage are in the Dockerfile, and on the DockerHub page for the image at https://hub.docker.com/r/scottcame/health-checker/.
