const Benchmark = require('benchmark')
const report = require('beautify-benchmark')
const v8 = require('v8')
const _ = require('lodash')
const deepcopy = require('deepcopy')
const clone = require('clone')
const cloneDeep = require('clone-deep')
const rfdc = require('rfdc')()

const value = {}
for (let i = 0; i < 32; i++) {
  value[`prop${i}`] = 0
}
console.log(value)

const json = () => JSON.parse(JSON.stringify(value))
const v8_ = () => v8.deserialize(v8.serialize(value))
const lodash = () => _.cloneDeep(value)
const deepcopy_ = () => deepcopy(value)
const clone_ = () => clone(value)
const cloneDeep_ = () => cloneDeep(value)
const rfdc_ = () => rfdc(value)

const suite = new Benchmark.Suite()
suite
  .add(`json`, json)
  .add(`v8`, v8_)
  .add(`lodash`, lodash)
  .add(`deepcopy`, deepcopy_)
  .add(`clone`, clone_)
  .add('clone-deep', cloneDeep_)
  .add('rfdc', rfdc_)
  .on('cycle', event => report.add(event.target))
  .on('complete', () => report.log())
  .run()
