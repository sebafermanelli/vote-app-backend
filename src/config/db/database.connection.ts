import { Options, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const Config: Options = {
	dialect: 'mysql',
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: Number(process.env.DB_PORT),
	logging: false,
};

export const sequelize: Sequelize = new Sequelize(Config);
