import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { Admin } from '../admin/admin.model';

interface ElectionAttributes {
	id: number;
	description: string;
	total_votes: number;
	finalizated: boolean;
	fecha_hora_fin: Date;
	admin_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export class Election extends Model<ElectionAttributes> {
	public id!: number;
	public description!: string;
	public total_votes!: number;
	public finalizated!: boolean;
	public fecha_hora_fin!: Date;
	public admin_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Election.init(
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		total_votes: {
			type: DataTypes.BIGINT,
			defaultValue: 0,
		},
		finalizated: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		fecha_hora_fin: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		admin_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: Admin,
				key: 'id',
			},
			onDelete: 'RESTRICT',
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
		modelName: 'election',
	}
);