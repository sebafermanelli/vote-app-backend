import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database.connection';
import { Election } from '../election/election.model';

interface AdminAttributes {
	id: number | null;
	username: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

export class Admin extends Model<AdminAttributes> {
	public id!: number;
	public username!: string;
	public password!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
	public deletedAt!: Date;
}

Admin.init(
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
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
		modelName: 'admin',
	}
);

Admin.hasMany(Election, { foreignKey: 'admin_id' });
