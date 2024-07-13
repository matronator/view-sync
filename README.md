# view-sync

![View Sync logo](https://raw.githubusercontent.com/matronator/view-sync/main/.github/logo.png)

![NPM Version](https://img.shields.io/npm/v/view-sync)
![NPM Downloads](https://img.shields.io/npm/dw/view-sync)
![npm TypeScript version](https://img.shields.io/npm/dependency-version/view-sync/dev/typescript)
![Tree shaking](https://badgen.net/bundlephobia/tree-shaking/view-sync)
![Dependencies](https://badgen.net/bundlephobia/dependency-count/view-sync)
![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/view-sync)
![Commits](https://badgen.net/github/commits/matronator/view-sync)
![Issues](https://img.shields.io/github/issues/matronator/view-sync.svg)
![License](https://img.shields.io/github/license/matronator/view-sync.svg)
<a href="https://github.com/matronator">![Follow](https://img.shields.io/github/followers/matronator.svg?style=social&label=Follow&maxAge=2592000)</a>
<a href="https://github.com/sponsors/matronator/">![GitHub Sponsors](https://img.shields.io/github/sponsors/matronator)</a>

Lightweight alternative to Alpine.js' `x-model` attribute, that is CSP friendly (no 'unsafe-eval' needed).

## Installation

With npm/yarn/pnpm/bun:

```
npm i view-sync
```

## Usage

HTML:

```html
<!-- Initialize view-sync and set initial value to "world" -->
<div id="app" data-sync-init="hello" data-sync-value="world">
    <!-- Value of these will be updated with value of `hello` in sync with each other -->
    <input type="text" data-sync="hello">
    <textarea data-sync="hello"></textarea>

    <!-- Text content of this will be updated with value of `hello` -->
    <span data-sync-text="hello"></span>

    <!-- This will be hidden if value of `hello` is falsy -->
    <div data-sync-state="hello">
        I will be hidden if `hello` is falsy
    </div>
</div>
```

JavaScript/TypeScript:

```ts
import { ViewSync } from 'view-sync';
ViewSync.Init();
```
