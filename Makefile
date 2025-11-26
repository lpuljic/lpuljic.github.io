.PHONY: theme-init theme-update serve dev build clean deploy help

help:
	@echo "Available commands:"
	@echo "  make theme-init    - Initialize/fetch theme on first setup"
	@echo "  make theme-update  - Update theme to latest version"
	@echo "  make serve         - Run development server"
	@echo "  make dev           - Run development server with drafts"
	@echo "  make build         - Build static site"
	@echo "  make deploy        - Build and deploy to GitHub"
	@echo "  make clean         - Clean build artifacts"

theme-init:
	export GOPRIVATE=github.com/lpuljic/* && hugo mod get -u

theme-update:
	export GOPRIVATE=github.com/lpuljic/* && hugo mod get -u

serve:
	export GOPRIVATE=github.com/lpuljic/* && hugo server

dev:
	export GOPRIVATE=github.com/lpuljic/* && hugo server -D

build:
	export GOPRIVATE=github.com/lpuljic/* && hugo

deploy: build
	git add public/
	git commit -m "Deploy: $$(date '+%Y-%m-%d %H:%M:%S')"
	git push origin main

clean:
	rm -rf resources/
