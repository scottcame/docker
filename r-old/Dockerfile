# Docker image definition for debian-based containers with old versions of R installed

FROM debian/eol:woody

MAINTAINER Scott Came <scottcame10@gmail.com>

# defaults to R version 1.1.1, which we know works; todo: experiment with other versions
# choose a different version by specifying --build-arg r_major_version=1 r_version=1.2.3
ARG r_major_version=1
ARG r_version=1.1.1

RUN apt-get update && apt-get install -y build-essential g77 xlib6g-dev curl

WORKDIR /tmp

# The Berkeley mirror seems fairly reliable and responsive

RUN curl -Os http://cran.cnr.berkeley.edu/src/base/R-$r_major_version/R-$r_version.tgz && \
  gunzip R-$r_version.tgz && \
  tar -xf R-$r_version.tar && \
  cd R-$r_version && \
  ./configure --without-x && make && make install && \
  cd .. && rm -rf R-*

WORKDIR /

CMD ["R"]
