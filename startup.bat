docker rm "storage.backup" -f
docker rmi "storage.backup" -f

COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build
docker run -d --restart unless-stopped -p  9000:9000 --name "storage.backup" -i -t "storage.backup" 