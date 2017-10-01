FROM ubuntu:16.04

RUN apt-get update -qq && \
	apt-get install -y build-essential cmake g++ libboost-dev libboost-system-dev \
                        libboost-filesystem-dev libexpat1-dev zlib1g-dev libxml2-dev\
                        libbz2-dev libpq-dev libgeos-dev libgeos++-dev libproj-dev \
                        postgresql-server-dev-9.5 postgresql-9.5-postgis-2.2 postgresql-contrib-9.5 \
                        apache2 php php-pgsql libapache2-mod-php php-pear php-db \
                        php-intl git curl && \
    cd / && \
	curl -O http://www.nominatim.org/release/Nominatim-3.0.1.tar.bz2 && \
	tar -xvf Nominatim-3.0.1.tar.bz2 && \
	cd Nominatim-3.0.1 && \
    mkdir build && \
    cd build && \
    cmake .. && \
    make

RUN apt-get install -y unzip python-gdal

RUN sed -ri "s/CONST_InstallPath.'\/module'/'\/usr\/lib\/postgresql'/g" /Nominatim-3.0.1/build/utils/setup.php

COPY local.php /Nominatim-3.0.1/build/settings/
COPY nominatim.conf /etc/apache2/conf-available/
COPY load-osm.sh /usr/local/bin/

RUN chmod ugo+x /usr/local/bin/load-osm.sh

ENV PGHOST postgis
ENV PGUSER nominatim
ENV PGPASSWORD nominatim

RUN a2enconf nominatim

EXPOSE 80
CMD ["apachectl", "-DFOREGROUND"]