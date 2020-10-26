import Babel from "https://dev.jspm.io/@babel/standalone";
import {
  dirname,
  extname,
  join,
} from "https://deno.land/std@0.74.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@0.74.0/fs/mod.ts";

interface BabelImportDeclarationPath {
  node: {
    source: {
      value: string;
    };
  };
}

function denoImports() {
  return {
    visitor: {
      ImportDeclaration(path: BabelImportDeclarationPath) {
        if (path.node.source) {
          path.node.source.value = path.node.source.value.replace(
            /\.ts$/,
            ".js",
          );
        }
      },
      ExportDeclaration(path: BabelImportDeclarationPath) {
        if (path.node.source) {
          path.node.source.value = path.node.source.value.replace(
            /\.ts$/,
            ".js",
          );
        }
      },
    },
  };
}

interface BabelCallExpressionPath {
  node: {
    callee: {
      name: string;
    };
    arguments: {
      value: string;
    }[];
  };
}

function denoRequires() {
  return {
    visitor: {
      CallExpression(path: BabelCallExpressionPath) {
        if (path.node.callee.name === "require") {
          for (let i = 0; i < path.node.arguments.length; i++) {
            path.node.arguments[i].value = path.node.arguments[i].value.replace(
              /\.ts$/,
              ".js",
            );
          }
        }
      },
    },
  };
}

Babel.registerPlugin("deno-imports", denoImports);
Babel.registerPlugin("deno-requires", denoRequires);

const cwd = Deno.cwd();
const dstPath = join(cwd, "dist");
const esmPath = join(dstPath, "esm");
const cjsPath = join(dstPath, "cjs");

const [_, cjsMap] = await Deno.compile("mod.ts", undefined, {
  declaration: true,
  lib: ["es2019", "es2020.bigint", "es2020.string", "es2020.symbol.wellknown"],
  module: "commonjs",
  removeComments: false,
  sourceMap: false,
  target: "es2019",
});

const [__, esmMap] = await Deno.compile("mod.ts", undefined, {
  declaration: true,
  lib: ["es2019", "es2020.bigint", "es2020.string", "es2020.symbol.wellknown"],
  module: "es2015",
  removeComments: false,
  sourceMap: false,
  target: "es2019",
});

for (const key of Reflect.ownKeys(cjsMap)) {
  if (typeof key === "string") {
    const path = join(cjsPath, new URL(key).pathname.replace(cwd, "").slice(1));
    let data = cjsMap[key];

    await ensureDir(dirname(path));

    if (extname(path) === ".js") {
      data = Babel.transform(data, { plugins: ["deno-requires"] }).code;
    }

    if (extname(path) === ".ts") {
      data = data.replace(/\.ts/g, ".js");
    }

    await Deno.writeTextFile(
      path,
      data,
      { create: true, append: false },
    );
  }
}

for (const key of Reflect.ownKeys(esmMap)) {
  if (typeof key === "string") {
    const path = join(esmPath, new URL(key).pathname.replace(cwd, "").slice(1));
    let data = esmMap[key];

    await ensureDir(dirname(path));

    if (extname(path) === ".js") {
      data = Babel.transform(data, { plugins: ["deno-imports"] }).code;
    }

    if (extname(path) === ".ts") {
      data = data.replace(/\.ts/g, ".js");
    }

    await Deno.writeTextFile(
      path,
      data,
      { create: true, append: false },
    );
  }
}
