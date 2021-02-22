import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const options: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  entities: ["./entities/*.js"],
  entitiesTs: ["./entities/*.ts"],
  clientUrl: "postgresql://test:test@127.0.0.1:5432/test",
};

export default options;
