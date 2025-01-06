# Usar a imagem oficial do OpenJDK
FROM openjdk:11-jdk-slim

# Diretório do app no container
WORKDIR /app

# Copiar o código-fonte para o container
COPY . .

# Compilar o projeto com Maven
RUN ./mvnw clean install -DskipTests

# Expor a porta que o Spring Boot vai rodar
EXPOSE 8080

# Rodar a aplicação Spring Boot
CMD ["java", "-jar", "target/crudapp-0.0.1-SNAPSHOT.jar"]
