### Docker Images

This directory contains the Dockerfiles and associated contexts for building various docker images.  The images are:

* *mdbtools:* An image for the [mdbtools](https://github.com/brianb/mdbtools) utility.
* *nominatim:* A base image for containers that support running the [Nominatim](https://wiki.openstreetmap.org/wiki/Nominatim) application/API.
* *nominatim-postgis:* An extension of the `nominatim` image that uses postgis as the backend.
* *r-keras-cuda-base:* A base image that installs NVIDIA [CUDA](https://developer.nvidia.com/cuda-faq) and [cuDNN](https://developer.nvidia.com/cudnn) and R 3.5.0 with the [keras](https://keras.rstudio.com/) installed
* *r-keras-cuda-default:* An extension of `r-keras-cuda-base` for use in environments without a tensorflow-supported GPU (e.g., runs keras/tensorflow on the machine's CPU)
* *r-keras-cuda-gpu:* An extension of `r-keras-cuda-base` for use in environments with a tensorflow-supported GPU and a Docker runtime that exposes the GPU in-container
* *rstudio-keras-cuda:* An extension of `r-keras-cuda-*` (base controlled by a build arg) for adding RStudio Server
* *data.world-mondrian-demo:* An image that demonstrates use of Mondrian OLAP to query dataset files on data.world

Note that all of these images are maintained in Docker Hub on my [site](https://hub.docker.com/u/scottcame/).
