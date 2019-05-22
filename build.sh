cd MovieCruiserAuthenticationService
source ./env-variable.sh
mvn clean package
cd ..
cd MovieCruiserService
source ./env-variable.sh
mvn clean package
cd ..
