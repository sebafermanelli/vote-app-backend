import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

export const Admin = sequelize.define('admin', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	username: {
		type: new DataTypes.STRING(),
		unique: true,
		allowNull: false,
	},
	password: {
		type: new DataTypes.STRING(),
		allowNull: false,
	},
});
