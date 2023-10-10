import { Options, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const Config: Options = {
	dialect: 'postgres',
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: Number(process.env.DB_PORT),
};

export const sequelize: Sequelize = new Sequelize(
	`${Config.dialect}://${Config.username}:${Config.password}@${Config.host}:${Config.port}/${Config.database}?sslmode=require`,
	{
		logging: false,
	}
);
