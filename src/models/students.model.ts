import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

export const Student = sequelize.define('student', {
	dni: {
		type: new DataTypes.INTEGER(),
		primaryKey: true,
	},
	name: {
		type: new DataTypes.STRING(),
		allowNull: false,
	},
	last_name: {
		type: new DataTypes.STRING(),
		allowNull: false,
	},
	course: {
		type: new DataTypes.STRING(),
		allowNull: false,
	},
	address: {
		type: new DataTypes.STRING(),
		allowNull: true,
	},
	email: {
		type: new DataTypes.STRING(),
		unique: true,
		allowNull: true,
	},
	phone: {
		type: new DataTypes.INTEGER(),
		unique: true,
		allowNull: true,
	},
	photo: {
		type: new DataTypes.BLOB(),
		allowNull: true,
	},
});
