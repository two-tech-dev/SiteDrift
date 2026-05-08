# Contributing to SiteDrift

Thanks for taking the time to contribute! Volunteers like you make this project possible.

## Ways to Contribute

- **Add or fix a bypass** — see [Adding a Bypass](#adding-a-bypass)
- **Report a bug** — open a GitHub issue
- **Improve documentation** — PRs welcome

## Adding a Bypass

1. Create a new file in `src/bypasses/` following the existing pattern:

```typescript
import BypassDefinition from './BypassDefinition';

export default class MySite extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true; // set true if you need the DOM to be ready
  }

  execute() {
    // your bypass logic here
    this.helpers.safelyNavigate(/* destination url */);
  }
}

export const matches = ['example.com'];
```

2. Add the site to [docs/Bypassed.md](./docs/Bypassed.md).
3. Test your bypass in an unpacked extension load (see [docs/INSTALLING.md](./docs/INSTALLING.md)).

## Code Style

See [docs/CODE_STYLE.md](./docs/CODE_STYLE.md).

## Submitting a Pull Request

Before submitting:

- [ ] Code follows the style guide
- [ ] Tested on Chromium (Chrome, Edge, Brave, etc.)
- [ ] Commit messages are descriptive
- [ ] No unrelated changes included

Consider joining the [Discord](https://discord.gg/DYeCKWP3jB) to discuss your PR before or while working on it.
