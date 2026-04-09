THEME_SRC ?= ../pixelarch

.PHONY: theme-init theme-update serve serve-local dev build clean help submodules

help:
	@echo "Available commands:"
	@echo "  make theme-init    - Initialize/fetch theme on first setup"
	@echo "  make theme-update  - Update theme to latest version"
	@echo "  make serve         - Run development server (uses submodule)"
	@echo "  make serve-local   - Run server with local theme from $(THEME_SRC)"
	@echo "  make dev           - Run development server with drafts"
	@echo "  make build         - Build static site (GitHub Actions handles deployment)"
	@echo "  make clean         - Clean build artifacts"

theme-init:
	export GOPRIVATE=github.com/lpuljic/* && hugo mod get -u

theme-update:
	export GOPRIVATE=github.com/lpuljic/* && hugo mod get -u

submodules:
	git submodule update --init --recursive

gitinfo:
	@echo '{"hash":"'$$(git log --format='%h' -1)'","date":"'$$(git log --format='%ci' -1 | cut -d' ' -f1)'"}' > data/git.json

serve: submodules gitinfo
	export GOPRIVATE=github.com/lpuljic/* && hugo mod get -u && hugo server

serve-local: gitinfo
	rsync -a --delete --exclude='.git' $(THEME_SRC)/ pixelarch/
	export GOPRIVATE=github.com/lpuljic/* && hugo mod get -u && hugo server

dev: submodules gitinfo
	export GOPRIVATE=github.com/lpuljic/* && hugo mod get -u && hugo server -D

build: submodules gitinfo
	export GOPRIVATE=github.com/lpuljic/* && hugo mod get -u && hugo

clean:
	rm -rf resources/
