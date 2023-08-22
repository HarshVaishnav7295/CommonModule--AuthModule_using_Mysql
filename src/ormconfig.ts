import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "./common/config.service";
export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: ConfigService.get('HOST'),
    username: ConfigService.get('DB_USER'),
    password: ConfigService.get('DB_PASSWORD'),
    database: ConfigService.get('DB_NAME'),
    migrations: ["dist/migrations/*.js"],
    entities : ["dist/entities/*.entity.js"]
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource