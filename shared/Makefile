install:
	pnpm install
.PHONY: install

update-internal:
	pnpm update "@breeze32/*" --latest
.PHONY: update-internal-packages

publish:
	pnpm version $(VERSION)
	pnpm exec tsup
	pnpm publish --access public --no-git-checks
.PHONY: publish