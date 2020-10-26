import Node from "./node.ts";

export default class Tree<K, V> implements Map<K, V> {
  readonly #degree: number = 2;

  #root: Node<K, V> = new Node(this.#degree);
  #size: number = 0;

  constructor();
  constructor(entries: readonly (readonly [K, V])[] | null);
  constructor(degree: number);
  constructor(degree: number, entries: readonly (readonly [K, V])[] | null);
  constructor(
    degree?: number | readonly (readonly [K, V])[] | null,
    entries?: readonly (readonly [K, V])[] | null,
  ) {
    if (typeof degree === "number") {
      this.#degree = degree;
    }

    if (Array.isArray(degree) && (entries === null || entries === undefined)) {
      degree.forEach(([key, value]) => this.set(key, value));
    }

    if (typeof degree === "number" && Array.isArray(entries)) {
      entries.forEach(([key, value]) => this.set(key, value));
    }
  }

  static isTree(value: unknown): value is Tree<unknown, unknown> {
    if (value instanceof Tree) {
      return true;
    }

    return false;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  get [Symbol.toStringTag](): string {
    return "Tree";
  }

  get root() {
    return this.#root;
  }

  get size(): number {
    return this.#size;
  }

  clear(): void {
  }

  delete(_: K): boolean {
    return false;
  }

  *entries(): IterableIterator<[K, V]> {
    for (const [key, value] of this.#root.entries()) {
      yield [key, value] as [K, V];
    }
  }

  forEach(
    callbackfn: (value: V, key: K, map: Tree<K, V>) => void,
    thisArg?: unknown,
  ): void {
    for (const [key, value] of this.entries()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  get(key: K): V | undefined {
    return this.#root.get(key);
  }

  has(key: K): boolean {
    return this.#root.has(key);
  }

  *keys(): IterableIterator<K> {
    for (const [key, _] of this.entries()) {
      yield key as K;
    }
  }

  set(key: K, value: V): this {
    let node = this.#root;

    if (node.full) {
      this.#root = new Node(this.#degree);

      this.#root.add(node);
      this.#root.split(this.#root.internalChildren.length >> 1);

      node = this.#root;
    }

    node.set(key, value);

    this.#size += 1;

    return this;
  }

  *values(): IterableIterator<V> {
    for (const [_, value] of this.entries()) {
      yield value as V;
    }
  }
}
