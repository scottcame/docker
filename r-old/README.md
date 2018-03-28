### Docker images for old/legacy releases of R

This directory contains a Dockerfile (docker image definition) for Debian-based containers with old releases
of [R](https://www.r-project.org/) installed.

Credit for the original idea on this goes to [Roger Peng](https://github.com/rdpeng) who mentioned it on the
[Not So Standard Deviations podcast](http://nssdeviations.com/).  I thought it was a cool idea to make old R
releases available, and figured that Docker was a great way to do it fairly easily.

Currently, the images derive from the stock `debian/eol:woody` base image ([Docker Hub](https://hub.docker.com/r/debian/eol/tags/)). The idea
here was to use an early Debian version--but not too early.  I was also able to get it to work on `debian/eol:potato` but decided to go with
the `woody` release instead.

#### Running the image

Obviously you'll need to have [Docker](https://www.docker.com/) installed first.  It's a pretty quick and painless install for both
[Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac), [Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows),
and [various distros of Linux](https://www.docker.com/community-edition).

Once I verify an R version, I will push an image with that tag to Docker Hub.  You can see the currently available
list [here](https://hub.docker.com/r/scottcame/r-old/tags/).

To run a container for a particular version:

```
$ docker run -it --rm scottcame/r-old:1.1.1

R : Copyright 2000, The R Development Core Team
Version 1.1.1  (August 15, 2000)

R is free software and comes with ABSOLUTELY NO WARRANTY.
You are welcome to redistribute it under certain conditions.
Type	"?license" or "?licence" for distribution details.

R is a collaborative project with many contributors.
Type	"?contributors" for a list.

Type	"demo()" for some demos, "help()" for on-line help, or
    	"help.start()" for a HTML browser interface to help.
Type	"q()" to quit R.

> set.seed(1234)
> x <- rnorm(100)
> x
  [1] -1.497879379 -0.508257984  0.277664456 -0.059254203 -0.049668384
  [6]  0.080509322  0.890963245  0.753485811  0.840549044  0.040313741
 [11] -0.464937023 -0.492781551 -0.091581009  0.809959475 -0.165303251
 [16] -0.161805539  0.685554176  2.615233974 -0.025496374  0.442461955
 [21]  1.306793584  0.216465517 -1.196450133 -2.378517571  1.304710876
 [26] -0.142681581 -1.009451296  2.344806495  0.533902731  0.090589245
 [31] -1.328107250  0.543443290 -0.159381489 -0.585080660  0.436587499
 [36]  1.148464565  1.833586755  0.980145627  2.636246867  0.271741159
 [41]  0.652659663 -1.675164360 -0.005074812  1.242533766  2.094752253
 [46] -0.375266550 -0.866128315  0.344014929  0.417092631 -0.614639056
 [51]  0.141182811 -0.354141023  0.172022251 -0.057422699 -0.182011007
 [56] -0.799224491  0.532771266 -1.679087715 -1.460874089 -0.654754420
 [61] -1.812149602 -0.098751820  0.821230462  0.472408498  0.142733199
 [66]  0.329172472 -0.784284357 -0.662322821  0.394322293 -0.037103900
 [71] -1.774887746  0.859488755 -0.617923842 -0.759272196  1.264929466
 [76] -2.307473160 -0.101346686 -0.300897521 -1.413744428 -0.457550457
 [81]  1.159660994 -0.645515784 -0.814091705  0.556697873 -0.036977682
 [86]  0.594474434  0.449433335  1.544620399  1.351141065  0.360470700
 [91]  0.755363602  1.090385768  1.939681600  1.603093155  1.188831935
 [96] -0.697269796 -0.793175672  0.363066499  0.774157079  0.324634896
> mean(x)
[1] 0.1186605
> min(x)
[1] -2.378518
>
```

#### Building the image

If you'd like to try out a version of R that isn't on Dockerhub, you can build the image yourself.  The Dockerfile is parameterized, so you just specify
the version you want to build. (Major and full version params are needed due to how CRAN organizes the past source release downloads...yes, we could probably
extract the major version from the full version, but I haven't gotten around to this yet.  Pull requests are always welcome!!)

For instance, to build a
local version of R version 1.2.2, clone the repo and run `docker build` from the directory containing the Dockerfile:

```
docker build -t r-1.2.2 --build-arg r_version=1.2.2 r_major_version=1 .
```

If you experiment with particular versions and run into issues building, please submit an issue so we can track progress and try to get those releases building.
The earliest R version I have been able to build successfully is 1.1.0 (from June 15, 2000).
