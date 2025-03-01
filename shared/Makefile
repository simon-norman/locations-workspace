install:
	pnpm install
.PHONY: install

update-internal-packages:
	pnpm update "@breeze32/*" --latest
.PHONY: update-internal-packages

publish:
	pnpm version $(VERSION)
	pnpm exec tsup
	pnpm publish --access public
.PHONY: publish