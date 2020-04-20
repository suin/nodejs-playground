const mixin = <T extends object, U extends object>(
  object: T,
  trait: U,
): Mixin<T, U> =>
  new Proxy(object, {
    get: (target, key) => (trait as any)[key] ?? (target as any)[key],
    has: (target, key) => key in trait || key in target,
  }) as any

type Mixin<T extends object, U extends object> = Omit<T, keyof U> & U

class Foo {
  getFoo(): 'foo' {
    return 'foo'
  }

  overriddenMethod(): 'foo' {
    return 'foo'
  }
}

class Trait {
  getBar(): 'bar' {
    return 'bar'
  }

  getFoobar(this: Mixin<Foo, Trait>): string {
    return this.getFoo() + this.getBar()
  }

  overriddenMethod(): 'bar' {
    return 'bar'
  }
}

const extendedFoo = mixin(new Foo(), new Trait())

console.assert(extendedFoo.getFoo() === 'foo')
console.assert(extendedFoo.getBar() === 'bar')
console.assert(extendedFoo.getFoobar() === 'foobar')
console.assert(extendedFoo.overriddenMethod() === 'bar')
const s: 'bar' = extendedFoo.overriddenMethod()
