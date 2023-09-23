import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';

interface AdminAttributes {
	id: string;
	username: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export class Admin extends Model<AdminAttributes> {
	public id!: string;
	public username!: string;
	public password!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Admin.init(
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			field: 'created_at',
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: 'updated_at',
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		modelName: 'admin',
	}
);