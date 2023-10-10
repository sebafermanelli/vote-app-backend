import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';

interface UserAttributes {
	id: string;
	name: string;
	last_name: string;
	course: string;
	address: string;
	email: string;
	phone: string;
	image: string;
	login_code: string;
	createdAt: Date;
	updatedAt: Date;
}

export class User extends Model<UserAttributes> {
	public id!: string;
	public name!: string;
	public last_name!: string;
	public course!: string;
	public address!: string;
	public email!: string;
	public phone!: string;
	public image!: string;
	public login_code!: string;
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
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
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
		image: {
			type: DataTypes.BLOB,
		},
		login_code: {
			type: DataTypes.STRING,
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
