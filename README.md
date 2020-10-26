# BTreeMap

[![build](https://img.shields.io/github/workflow/status/atsjj/b-tree-map/ci)](https://github.com/atsjj/b-tree-map/actions?query=workflow%3Aci)
[![doc](https://img.shields.io/badge/deno-doc-blue)](https://doc.deno.land/https/deno.land/x/b-tree-map/mod.ts)
[![npm](https://img.shields.io/npm/v/@atsjj/b-tree-map)](https://www.npmjs.com/package/@atsjj/b-tree-map)

BTreeMap is a library that implements Map based on a B-Tree. BTreeMap has first-class
support for Deno and TypeScript, but also ships with support for Node CommonJS and ES Modules.

BTreeMap is based on the work of [Ruby-BTree](https://github.com/seifertd/Ruby-BTree).

## Install (Node)

```
npm install --save @atsjj/b-tree-map;
```

## Usage

### Deno

```ts
import { Tree } from "https://deno.land/x/b-tree-map/mod.ts";

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
  import { Tree } from "https://cdn.skypack.dev/@atsjj/b-tree-map";

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
import { Tree } from "@atsjj/b-tree-map";

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
const { Tree } = require("@atsjj/b-tree-map");

const tree: Tree<string, string> = new Tree();

tree.set("key 1", "value 1");
tree.set("key 3", "value 3");
tree.set("key 2", "value 2");

console.log(tree.get("key 1")) // "value 1"
console.log(tree.get("key 3")) // "value 3"
console.log(tree.get("key 2")) // "value 2"
```
