docker-build:
	docker build -t mynode .

docker-run:
	docker run -p 8000:8000 mynode
