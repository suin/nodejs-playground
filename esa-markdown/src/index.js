import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import codeFence from './remark-esa-code-fence'
import emoji from './remark-esa-emoji'
import footnotes from 'remark-footnotes'
import mention, { DefaultMembers } from './remark-esa-mention'
import stringify from 'rehype-stringify'
import format from 'rehype-format'
var stream = require('unified-stream')

class Members extends DefaultMembers {
  has(username) {
    if (super.has(username)) {
      return true
    }
    return username === 'suin'
  }
}

const processor = unified()
  .use(markdown, { commonmark: true })
  .use(emoji)
  .use(mention, { members: new Members() })
  .use(codeFence)
  .use(footnotes)
  .use(remark2rehype, { allowDangerousHtml: true })
  .use(format)
  .use(stringify, { allowDangerousHtml: true })

// processor
//   .process(
//     `
//   :sushi:
//
//   :hatched_chick:
//
//   :bird:
//
//   :octocat:
//
//   :esa:
//
//   :@suin:
//
//   :unknown:`,
//   )
//   .then(value => console.log(value.contents))

process.stdout.write(`<meta charset="utf8">
<link rel="stylesheet" href="https://assets.esa.io/assets/application-4e08b8b36ca165a4bb7b47ef8e1cbadb7ad45c23faa3d52f44e1a26c4614c718.css">
<link rel="stylesheet" href="./node_modules/prismjs/themes/prism.css">
<body class="posts-show en user-theme--sky">
<div class="outer layout-outer">
<div class="layout-outer__main">
<div class="body">
<div class="layout-wrapper">
<div class="layout-post">
<div class="layout-post__main">
  <div class="post-body markdown">
`)
process.stdin
  .pipe(stream(processor))
  .pipe(process.stdout)
  .on('end', () => {
    process.stdout.write(`</div></div></div></div></div></div></div></body>`)
  })
