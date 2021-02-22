import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Book {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;
}
