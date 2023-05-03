import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'said123',
    database: 'postgres',
    synchronize: true,
    entities: [__dirname + '/../**/*.entity.ts'],
}