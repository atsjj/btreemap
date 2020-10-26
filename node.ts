export default class Node<K, V> implements Map<K, V> {
  readonly #children: Array<Node<K, V>> = [];
  readonly #degree: number = 2;
  readonly #keys: Array<K> = [];
  readonly #values: Array<V> = [];

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

  static isNode(value: unknown): value is Node<unknown, unknown> {
    if (value instanceof Node) {
      return true;
    }

    return false;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  get [Symbol.toStringTag](): string {
    return "Node";
  }

  get full(): boolean {
    return this.size >= 2 * this.#degree - 1;
  }

  get leaf(): boolean {
    return this.#children.length === 0;
  }

  get internalChildren(): Array<Node<K, V>> {
    return this.#children;
  }

  get internalKeys() {
    return this.#keys;
  }

  get internalValues() {
    return this.#values;
  }

  get size(): number {
    return this.#keys.length;
  }

  add(value: Node<K, V>): this {
    this.#children.push(value);

    return this;
  }

  clear(): void {
  }

  delete(_: K): boolean {
    return false;
  }

  *entries(): IterableIterator<[K, V]> {
    for (const [index, key] of this.#keys.entries()) {
      yield [key, this.#values[index]] as [K, V];
    }

    for (const child of this.#children) {
      yield* child.entries();
    }
  }

  forEach(
    callbackfn: (value: V, key: K, map: Node<K, V>) => void,
    thisArg?: unknown,
  ): void {
    for (const [key, value] of this.entries()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  get(key: K): V | undefined {
    let i = 1;

    while (i <= this.size && key > this.keyAt(i - 1)) {
      i += 1;
    }

    if (
      i <= this.size && key >= this.keyAt(i - 1) && key <= this.keyAt(i - 1)
    ) {
      return this.valueAt(i - 1);
    } else if (this.leaf) {
      return undefined;
    } else {
      return this.childAt(i - 1).get(key);
    }
  }

  has(key: K): boolean {
    for (const [k, _] of this.entries()) {
      if (k === key) {
        return true;
      }
    }

    return false;
  }

  *keys(): IterableIterator<K> {
    for (const [key, _] of this.entries()) {
      yield key;
    }
  }

  keyAt(index: number): K {
    return this.#keys[index];
  }

  valueAt(index: number): V {
    return this.#values[index];
  }

  childAt(index: number): Node<K, V> {
    return this.#children[index];
  }

  setKeyAt(index: number, key: K): this {
    this.#keys.splice(index, 1, key);

    return this;
  }

  setValueAt(index: number, value: V): this {
    this.#values.splice(index, 1, value);

    return this;
  }

  setChildAt(index: number, child: Node<K, V>): this {
    this.#children.splice(index, 1, child);

    return this;
  }

  set(key: K, value: V): this {
    if (this.has(key)) {
      throw `duplicate key: ${key}`;
    }

    let i = this.size - 1;

    if (this.leaf) {
      while (i >= 0 && this.keyAt(i) && key < this.keyAt(i)) {
        this.setKeyAt(i + 1, this.keyAt(i));
        this.setValueAt(i + 1, this.valueAt(i));

        i -= 1;
      }

      this.setKeyAt(i + 1, key);
      this.setValueAt(i + 1, value);
    } else {
      while (i >= 0 && this.keyAt(i) && key < this.keyAt(i)) {
        i -= 1;
      }

      if (this.childAt(i + 1).full) {
        this.split(i + 1);

        if (key > this.keyAt(i + 1)) {
          i += 1;
        }
      }

      this.childAt(i + 1).set(key, value);
    }

    return this;
  }

  split(index: number): this {
    if (index < 0 || index >= this.#children.length) {
      throw `Invalid child index ${index} in split, children = ${this.#children.length}`;
    }

    const child = this.childAt(index);
    const y = new Node<K, V>(this.#degree);
    const z = new Node<K, V>(this.#degree);

    for (let j = 0; j < this.#degree - 1; j++) {
      z.internalKeys.push(child.keyAt(j + this.#degree));
      z.internalValues.push(child.valueAt(j + this.#degree));

      y.internalKeys.push(child.keyAt(j));
      y.internalValues.push(child.valueAt(j));
    }

    if (!child.leaf) {
      for (let j = 0; j < this.#degree; j++) {
        z.internalChildren.push(child.childAt(j + this.#degree));
        y.internalChildren.push(child.childAt(j));
      }
    }

    const middleKey = child.keyAt(this.#degree - 1);
    const middleValue = child.valueAt(this.#degree - 1);

    for (let j = this.#keys.length; j >= index; j--) {
      this.setChildAt(j + 1, this.childAt(j));
    }

    this.setChildAt(index + 1, z);
    this.setChildAt(index, y);

    for (let j = this.#keys.length - 1; j >= index; j--) {
      this.setKeyAt(j + 1, this.keyAt(j));
      this.setValueAt(j + 1, this.valueAt(j));
    }

    this.setKeyAt(index, middleKey);
    this.setValueAt(index, middleValue);

    return this;
  }

  *values(): IterableIterator<V> {
    for (const [_, value] of this.entries()) {
      yield value;
    }
  }
}
