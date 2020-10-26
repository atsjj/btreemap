import { assertStrictEquals } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import Node from "./node.ts";

const node: Node<string, string> = new Node();

node.set("key a", "value a");
node.set("key b", "value b");
node.set("key c", "value c");

Deno.test("Node", function () {
  assertStrictEquals(
    node.get("key a"),
    "value a",
    "get key a",
  );
  assertStrictEquals(
    node.get("key b"),
    "value b",
    "get key b",
  );
  assertStrictEquals(
    node.get("key c"),
    "value c",
    "get key c",
  );
});
