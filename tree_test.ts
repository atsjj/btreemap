import { assertStrictEquals } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import Tree from "./tree.ts";

const tree: Tree<string, string> = new Tree();

tree.set("key a", "value a");
tree.set("key b", "value b");
tree.set("key c", "value c");

Deno.test("Tree", function () {
  assertStrictEquals(
    tree.get("key a"),
    "value a",
    "get key a",
  );
  assertStrictEquals(
    tree.get("key b"),
    "value b",
    "get key b",
  );
  assertStrictEquals(
    tree.get("key c"),
    "value c",
    "get key c",
  );
});
