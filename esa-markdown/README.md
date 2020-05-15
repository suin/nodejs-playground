# esa-markdown

esa.ioと互換したMarkdownパーサーの実装実験。

極力esa.ioが出力するHTMLに近づけるように実装している。

## 特徴

* code fence
    * ファイル名に対応
* emoji
    * esa独自の絵文字にも対応
    * カスタム絵文字にも対応できる拡張性
* mention
    * 対応済み

## 判明している非互換性

* code fence
    * esaはRubyのRougeを使っているが、このパーサーはPrism.js
    * 💡SinatraでRougeサーバを立てて連携するといいかも。
* PlantUML
    * 非対応
    * 💡javaでPlantUMLを実行すればできそう。
* Mermaid
    * 非対応
* TOC
    * ヘッダーにアンカーしこむのも、目次を生成するのも非対応
