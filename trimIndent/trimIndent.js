const minIndent = string => {
  const match = string.match(/^[ ]*(?=\S)/gm)
  return match ? Math.min(...match.map(m => m.length)) : 0
}

const trimIndent = (stringOrTemplate, ...expressions) => {
  const string =
    typeof stringOrTemplate === "string"
      ? stringOrTemplate
      : stringOrTemplate.reduce(
        (acc, part, i) => acc + expressions[i - 1] + part
      )
  const indent = minIndent(string)
  return indent === 0
    ? string
    : string.replace(new RegExp(`^[ ]{${indent}}`, "gm"), "").replace(/^\n/, "")
}

// language=yaml
console.log(
  `
  services:
    app:
      image: node
    db:
      image: mysql`
)
// 出力結果: ☹️
//   services:
//     app:
//       image: node
//     db:
//       image: mysql

console.log(
  // language=yaml
  trimIndent`
    services:
      app:
        image: node
      db:
        image: mysql`
)
// 出力結果: 😆
//services:
//   app:
//     image: node
//   db:
//     image: mysql
