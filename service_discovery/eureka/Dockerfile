FROM maven:3.6.1-jdk-8

RUN mkdir -p /usr/src/eureka
WORKDIR /usr/src/eureka

COPY . /usr/src/eureka
RUN mvn clean install

EXPOSE 9091
CMD ["java", "-jar", "target/eureka-server-0.0.1.jar"]
