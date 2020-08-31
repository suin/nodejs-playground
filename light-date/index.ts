import { format, localeFormat } from 'light-date'

const now = new Date('2001-02-03T04:05:06')

console.log(format(now, '{yyyy}/{MM}/{dd} {HH}:{mm}:{ss}'))
//=> 2001/02/03 04:05:06

console.log(
  format(now, '{yyyy}年{MM}月{dd}日') + localeFormat(now, '({E})', 'ja-JP'),
)
//=> 2001年02月03日(土)
