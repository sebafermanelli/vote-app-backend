import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';

interface RoleAttributes {
	id: number;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

export class Role extends Model<RoleAttributes> {
	public id!: number;
	public description!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Role.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
		},
		description: {
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
		modelName: 'role',
	}
);
