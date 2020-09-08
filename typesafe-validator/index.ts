type Reader<I, O, E extends AnyErr> = (input: I) => Result<O, E>
type AnyReader = Reader<any, any, any>

type Result<O, E extends AnyErr> = Ok<O> | Bad<E>

type Ok<T> = {
  readonly ok: true
  readonly value: T
}

type Bad<E extends AnyErr> = {
  readonly ok: false
  readonly errors: ReadonlyArray<E>
  readonly mapErrors: <T>(
    mapper: {
      [K in E['code']]: (err: Extract<E, Err<any, K>>) => T
    },
  ) => T[]
}

const ok = <T>(value: T): Ok<T> => ({ ok: true, value })
const bad = <E extends AnyErr>(...errors: E[]): Bad<E> => ({
  ok: false,
  errors,
  mapErrors: <T>(
    mapper: { [K in E['code']]: (err: Extract<E, Err<any, K>>) => T },
  ): T[] => errors.map(err => (mapper as any)[err.code](err)),
})

type Err<I, E extends Code, X extends Extra<I, E> = {}> = {
  readonly code: E
  readonly input: I
} & X

type AnyErr = Err<any, any>
type Extra<I, E extends Code> = Partial<Err<I, E>> & { [k: string]: any }

type Code = string

function compose<I, O, E extends AnyErr>(
  ...readers: [Reader<I, O, E>]
): Reader<I, O, E>
function compose<I1, I2, O, E1 extends AnyErr, E2 extends AnyErr>(
  ...readers: [Reader<I1, I2, E1>, Reader<I2, O, E2>]
): Reader<I1, O, E1 | E2>
function compose<
  I1,
  I2,
  I3,
  O,
  E1 extends AnyErr,
  E2 extends AnyErr,
  E3 extends AnyErr
>(
  ...readers: [Reader<I1, I2, E1>, Reader<I2, I3, E2>, Reader<I3, O, E3>]
): Reader<I1, O, E1 | E2 | E3>
function compose<
  I1,
  I2,
  I3,
  I4,
  O,
  E1 extends AnyErr,
  E2 extends AnyErr,
  E3 extends AnyErr,
  E4 extends AnyErr
>(
  ...readers: [
    Reader<I1, I2, E1>,
    Reader<I2, I3, E2>,
    Reader<I3, I4, E3>,
    Reader<I4, O, E4>,
  ]
): Reader<I1, O, E1 | E2 | E3 | E4>
function compose(...readers: AnyReader[]): AnyReader {
  return (value: any) => {
    for (let reader of readers) {
      const result = reader(value)
      if (!result.ok) {
        return result
      }
      value = result.value
    }
    return { ok: true, value }
  }
}

const reader = compose

type InferErr<
  P extends AnyReader | ReaderFactory<any, any, any>
> = P extends Reader<any, any, infer Err>
  ? Err
  : P extends ReaderFactory<any, any, infer Err>
  ? Err
  : never
type ReaderFactory<I, O, E extends AnyErr> = (...args: any[]) => Reader<I, O, E>

//--------

const typeString = reader(input =>
  typeof input === 'string'
    ? ok(input)
    : bad({ code: 'notString', input } as const),
)

const typeNumber = reader(input =>
  typeof input === 'number'
    ? ok(input)
    : bad({ code: 'notNumber', input } as const),
)

const stringMin = <Min extends number>(min: Min) =>
  reader(<I extends string>(input: I) =>
    input.length >= min
      ? ok(input)
      : bad({
          code: 'stringTooShort',
          input,
          min,
          length: input.length,
        } as const),
  )

const stringMax = <Max extends number>(max: Max) =>
  reader(<I extends string>(input: I) =>
    input.length <= max
      ? ok(input)
      : bad({
          code: 'stringTooLong',
          input,
          max,
          length: input.length,
        } as const),
  )

const stringMinMax = <Min extends number, Max extends number>(
  min: Min,
  max: Max,
) => compose(stringMin(min), stringMax(max))

const stringLength = <Length extends number>(length: Length) =>
  reader(<I extends string>(input: I) =>
    input.length === length
      ? ok(input)
      : bad({ code: 'stringLength', input, length } as const),
  )

const stringPattern = <T extends RegExp>(pattern: T) =>
  reader(<I extends string>(input: I) =>
    pattern.test(input)
      ? ok(input)
      : bad({ code: 'stringNotMatchedPattern', input, pattern } as const),
  )

const intString = reader(<I extends string>(input: I) => {
  const int = parseInt(input)
  return Number.isNaN(int)
    ? bad({ code: 'notIntString', input } as const)
    : ok(int)
})

const numberMin = <Min extends number>(min: Min) =>
  reader(<I extends number>(input: I) =>
    input >= min
      ? ok(input)
      : bad({ code: 'numberTooSmall', input, min } as const),
  )

declare function union<I, O1, O2, E1 extends AnyErr, E2 extends AnyErr>(
  reader1: Reader<I, O1, E1>,
  reader2: Reader<I, O2, E2>,
): Reader<I, O1 | O2, E1 | E2>

const r = union(typeString, typeNumber)
const x = r('')
if (x.ok) {
  const value = x.value
} else {
  x.mapErrors({
    stringTooShort: err => err.min,
  })
}

const read = compose(
  stringMinMax(1, 15),
  // stringPattern(/^[A-Za-z0-9_-]*$/),
)
const result = read('100')
if (result.ok) {
  const value = result.value
  console.log(value) //=> 200
} else {
  const messages = result.mapErrors({
    stringTooShort: err => ``,
    stringTooLong: err => ``,
    // stringNotMatchedPattern: err => null,
  })
  console.log(messages)
}

export type _ = any
