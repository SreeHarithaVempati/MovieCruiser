FROM java:8-jre
WORKDIR usr/src
ENV MYSQL_DATABASE=moviedatabase
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
ENV MYSQL_CI_URL=jdbc:mysql://localhost:3306/moviedatabase
ADD target/MovieCruiserService-0.0.1-SNAPSHOT.jar /usr/src/MovieCruiserService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java" ,"-jar","MovieCruiserService-0.0.1-SNAPSHOT.jar"]
