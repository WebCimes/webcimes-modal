.PHONY: help dev watch build pack push publish

help:
	@printf '%s\n' \
		'  make dev      Start the Vite development server' \
		'  make watch    Rebuild dist when sources change' \
		'  make build    Build bundles, styles and declarations' \
		'  make pack     Build and preview the npm package' \
		'  make push     Push main to GitHub' \
		'  make publish  Build and publish the package to npm'

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
