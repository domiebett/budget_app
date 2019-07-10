FROM maven:3.6.1-jdk-8

RUN mkdir -p /usr/src/zuul
WORKDIR /usr/src/zuul

COPY . /usr/src/zuul
RUN mvn clean install

EXPOSE 9092
CMD ["java", "-jar", "target/zuul-server-0.0.1.jar"]
