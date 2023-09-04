import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database.connection';

interface StudentAttributes {
	id: string;
	name: string;
	last_name: string;
	course: string;
	address: string | null;
	email: string;
	phone: string | null;
	image: string | null;
	login_code: string | null;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

export class Student extends Model<StudentAttributes> {
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
	public deletedAt!: Date;
}

Student.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
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
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image: {
			type: DataTypes.BLOB,
			allowNull: true,
		},
		login_code: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			field: 'created_at',
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: 'updated_at',
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
		deletedAt: {
			type: DataTypes.DATE,
			field: 'deleted_at',
			allowNull: true,
		},
	},
	{
		sequelize,
		paranoid: true,
		freezeTableName: true,
		modelName: 'student',
	}
);
