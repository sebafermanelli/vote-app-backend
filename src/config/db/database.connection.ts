import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

export const sequelize: Sequelize = new Sequelize(`${process.env.DB_URL}`, {
	logging: false,
});
