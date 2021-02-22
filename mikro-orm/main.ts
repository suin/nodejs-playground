import { MikroORM } from "@mikro-orm/core";
import { Book } from "./entities/book";
import config from "./mikro-orm.config";

async function main() {
  // ORMの初期化
  const orm = await MikroORM.init(config);

  // Bookレポジトリを取得する
  const bookRepository = orm.em.getRepository(Book);

  // Bookエンティティを作る
  const newBook = new Book();
  newBook.title = "サバイバルTypeScript";

  // Bookエンティティを保存する
  await bookRepository.persistAndFlush(newBook);
  console.log({ newBook });

  // 保存したBookエンティティを取り出す
  const books = await bookRepository.findAll();
  console.log({ books });
}

main()
  .then(() => process.exit())
  .catch(console.error);
