# Dockerfile to create a demo for querying data.world dataset files via a Mondrian OLAP REST API

# Demonstration runs in an Apache Tomcat instance.  So after running a container, access:
# http://[host]/demo (for the demo viz page)
# http://[host]/mondrian-rest/query-ui/ (for the MDX query submission page)

FROM ojbc/mondrian-rest:no-auth

RUN cd /tmp && \
  curl -O http://central.maven.org/maven2/world/data/dw-jdbc/0.4.4/dw-jdbc-0.4.4-shaded.jar && \
  mv dw-jdbc-0.4.4-shaded.jar /usr/local/tomcat/shared/

COPY files/application.properties /usr/local/tomcat/shared/config/
COPY files/*.json /usr/local/tomcat/shared/
COPY files/*.xml /usr/local/tomcat/shared/

RUN mkdir -p /usr/local/tomcat/webapps/demo
COPY files/index.html /usr/local/tomcat/webapps/demo/
COPY files/demo.js /usr/local/tomcat/webapps/demo/

COPY files/entrypoint.sh /
CMD ["/entrypoint.sh"]
EXPOSE 80

# Start docker with --env DW_TOKEN="<your data.world auth token from https://data.world/settings/advanced>"
ENV DW_TOKEN="<placeholder>"
