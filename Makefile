PROJECT_ROOT := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
UID := $(shell id -u)
GID := $(shell id -g)

start: install
	docker run -v $(PROJECT_ROOT):/project --net=host -p 8080:8080 -it mynode /bin/bash -c 'yarn start'

build: install
	rm -rf public
	docker run -v $(PROJECT_ROOT):/project -it mynode /bin/bash -c 'yarn build && chown -R $(UID):$(GID) public'

build_production: install
	rm -rf public
	docker run -v $(PROJECT_ROOT):/project -it mynode /bin/bash -c 'yarn build:production && chown -R $(UID):$(GID) public'

shell: build_image
	docker run -v $(PROJECT_ROOT):/project -it mynode /bin/bash

install: build_image
	docker run -v $(PROJECT_ROOT):/project -it mynode /bin/bash -c 'yarn install'

build_image:
	docker build -t mynode .
