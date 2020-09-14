ifeq ($(origin IMAGE_TAG), undefined)
IMAGE_TAG := $(shell date +%s)
endif

ifeq ($(origin GITHUB_ACCESS_TOKEN), undefined)
$(error GITHUB_ACCESS_TOKEN must be set)
endif

.PHONY: auth build default push

default: build push

auth:
	$(info Logging in to Github Containers...)
	@docker login ghcr.io -u xicreative --password $(GITHUB_ACCESS_TOKEN)

build:
	docker build \
		-t evan.pavlica.us:$(IMAGE_TAG) \
		-t ghcr.io/xicreative/evan.pavlica.us:$(IMAGE_TAG) \
		-t ghcr.io/xicreative/evan.pavlica.us:latest \
		.

push: auth
	docker push ghcr.io/xicreative/evan.pavlica.us:$(IMAGE_TAG)
	docker push ghcr.io/xicreative/evan.pavlica.us:latest
