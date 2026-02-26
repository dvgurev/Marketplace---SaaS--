# Makefile with helpers for container management

# choose compose command: prefer podman-compose, fall back to docker-compose
COMPOSE := $(shell command -v podman-compose 2>/dev/null || command -v docker-compose)

.PHONY: up down build logs

up:
	@echo "using compose: $(COMPOSE)"
	$(COMPOSE) up --build -d

down:
	@echo "using compose: $(COMPOSE)"
	$(COMPOSE) down

logs:
	@echo "using compose: $(COMPOSE)"
	$(COMPOSE) logs -f
