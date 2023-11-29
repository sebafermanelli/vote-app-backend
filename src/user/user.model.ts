import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';

interface UserAttributes {
	id: string;
	name: string;
	lastName: string;
	course: string;
	address: string;
	email: string;
	phone: string;
	loginCode: string;
	createdAt: Date;
	updatedAt: Date;
}

export class User extends Model<UserAttributes> {
	public id!: string;
	public name!: string;
	public lastName!: string;
	public course!: string;
	public address!: string;
	public email!: string;
	public phone!: string;
	public loginCode!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'last_name',
		},
		course: {
			type: DataTypes.STRING,
		},
		address: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
		},
		loginCode: {
			type: DataTypes.STRING,
			field: 'login_code',
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
		modelName: 'user',
	}
);
