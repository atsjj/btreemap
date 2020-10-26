# BTreeMap

[![build](https://img.shields.io/github/workflow/status/atsjj/btreemap/ci)](https://github.com/atsjj/btreemap/actions?query=workflow%3Aci)
[![doc](https://img.shields.io/badge/deno-doc-blue)](https://doc.deno.land/https/deno.land/x/btreemap/mod.ts)
[![npm](https://img.shields.io/npm/v/@atsjj/btreemap)](https://www.npmjs.com/package/@atsjj/btreemap)

BTreeMap is a library that implements Map based on a B-Tree. BTreeMap has first-class
support for Deno and TypeScript, but also ships with support for Node CommonJS and ES Modules.

BTreeMap is based on the work of [Ruby-BTree](https://github.com/seifertd/Ruby-BTree).

## Install (Node)

```
npm install --save @atsjj/btreemap;
```

## Usage

### Deno

```ts
import { Tree } from "https://deno.land/x/btreemap/mod.ts";

const tree: Tree<string, string> = new Tree();

tree.set("key 1", "value 1");
tree.set("key 3", "value 3");
tree.set("key 2", "value 2");

console.log(tree.get("key 1")) // "value 1"
console.log(tree.get("key 3")) // "value 3"
console.log(tree.get("key 2")) // "value 2"
```

### Browser

```html
<script type="module">
  import { Tree } from "https://cdn.skypack.dev/@atsjj/btreemap";

  const tree: Tree<string, string> = new Tree();

  tree.set("key 1", "value 1");
  tree.set("key 3", "value 3");
  tree.set("key 2", "value 2");

  console.log(tree.get("key 1")) // "value 1"
  console.log(tree.get("key 3")) // "value 3"
  console.log(tree.get("key 2")) // "value 2"
</script>
```

### Node / ESM

```javascript
import { Tree } from "@atsjj/btreemap";

const tree: Tree<string, string> = new Tree();

tree.set("key 1", "value 1");
tree.set("key 3", "value 3");
tree.set("key 2", "value 2");

console.log(tree.get("key 1")) // "value 1"
console.log(tree.get("key 3")) // "value 3"
console.log(tree.get("key 2")) // "value 2"
```

### Node / CJS

```javascript
const { Tree } = require("@atsjj/btreemap");

const tree: Tree<string, string> = new Tree();

tree.set("key 1", "value 1");
tree.set("key 3", "value 3");
tree.set("key 2", "value 2");

console.log(tree.get("key 1")) // "value 1"
console.log(tree.get("key 3")) // "value 3"
console.log(tree.get("key 2")) // "value 2"
```
