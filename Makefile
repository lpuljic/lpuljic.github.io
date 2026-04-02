.PHONY: theme-init theme-update serve dev build clean help

help:
	@echo "Available commands:"
	@echo "  make theme-init    - Initialize/fetch theme on first setup"
	@echo "  make theme-update  - Update theme to latest version"
	@echo "  make serve         - Run development server"
	@echo "  make dev           - Run development server with drafts"
	@echo "  make build         - Build static site (GitHub Actions handles deployment)"
	@echo "  make clean         - Clean build artifacts"

theme-init:
	export GOPRIVATE=github.com/lpuljic/* && hugo mod get -u

theme-update:
	export GOPRIVATE=github.com/lpuljic/* && hugo mod get -u

gitinfo:
	@echo '{"hash":"'$$(git log --format='%h' -1)'","date":"'$$(git log --format='%ci' -1 | cut -d' ' -f1)'"}' > data/git.json

serve: gitinfo
	export GOPRIVATE=github.com/lpuljic/* && hugo server

dev: gitinfo
	export GOPRIVATE=github.com/lpuljic/* && hugo server -D

build: gitinfo
	export GOPRIVATE=github.com/lpuljic/* && hugo

clean:
	rm -rf resources/
