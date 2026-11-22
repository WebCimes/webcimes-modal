.PHONY: help dev watch build pack push publish tag

help:
	@printf '%s\n' \
		'Release: make pack → commit → make push → make publish → make tag' \
		'' \
		'  make dev      Start the Vite development server' \
		'  make watch    Rebuild dist when sources change' \
		'  make build    Build bundles, styles and declarations' \
		'  make pack     Build and preview the npm package' \
		'  make push     Push main to GitHub' \
		'  make publish  Build and publish the package to npm' \
		'  make tag      Create and push the committed package version tag'

dev:
	npm run dev

watch:
	npm run watch

build:
	npm run build

pack: build
	npm pack --dry-run

push:
	git push origin main

publish: build
	npm publish --access public

tag:
	@set -e; \
	version=$$(git show HEAD:package.json | node -p 'JSON.parse(require("node:fs").readFileSync(0, "utf8")).version ?? ""'); \
	test -n "$$version"; \
	git tag -a "$$version" -m "Release $$version"; \
	git push origin "refs/tags/$$version"
