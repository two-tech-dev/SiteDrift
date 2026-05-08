# Code Style

## Language

- All bypasses are written in **TypeScript** (`.ts`).
- Target: `ESNext` with DOM types.

## Formatter

- [Prettier](https://prettier.io/) — run automatically on save if using the VS Code extension.
- Unix line endings (LF).
- Newline at end of file.

## ESLint

- Uses `@typescript-eslint/recommended` + `eslint-plugin-vue`.
- Run `npm run lint` before submitting a PR.

## Bypass Structure

Every bypass must:

1. `import BypassDefinition from './BypassDefinition'`
2. Export a `default` class extending `BypassDefinition`.
3. Export a `matches` array of **hostnames only** (no `https://`, no trailing slashes, no spaces).

```typescript
import BypassDefinition from './BypassDefinition';

export default class MySite extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    this.helpers.safelyNavigate(/* url */);
  }
}

export const matches = ['example.com', 'www.example.com'];
```

## VS Code Setup

- Install the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension.
- Enable **Format on Save** in settings.
