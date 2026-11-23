NPM_PUBLISH := npm publish --access public

.PHONY: help dev watch build pack push publish tag release

help:
	@printf '%s\n' \
		'Release: make pack → commit → make release' \
		'' \
		'  make dev      Start the Vite development server' \
		'  make watch    Rebuild dist when sources change' \
		'  make build    Build bundles, styles and declarations' \
		'  make pack     Build and preview the npm package' \
		'  make push     Push main to GitHub' \
		'  make publish  Build and publish the package to npm' \
		'  make tag      Create and push the committed package version tag' \
		'  make release  Pack, check npm login, push, publish and tag'

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
	$(NPM_PUBLISH)

tag:
	@set -e; \
	version=$$(git show HEAD:package.json | node -p 'JSON.parse(require("node:fs").readFileSync(0, "utf8")).version ?? ""'); \
	test -n "$$version"; \
	git tag -a "$$version" -m "Release $$version"; \
	git push origin "refs/tags/$$version"

release:
	@test "$$(git branch --show-current)" = main || { echo "Release from main." >&2; exit 1; }
	@test -z "$$(git status --porcelain)" || { echo "Commit the release changes first." >&2; exit 1; }
	$(MAKE) pack
	@test -z "$$(git status --porcelain)" || { echo "The build changed files. Commit them before releasing." >&2; exit 1; }
	npm whoami || npm login
	$(MAKE) push
	$(NPM_PUBLISH)
	$(MAKE) tag
