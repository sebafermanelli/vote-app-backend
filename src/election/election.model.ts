import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database.connection';
import { Admin } from '../admin/admin.model';

interface ElectionAttributes {
	id: number;
	description: string;
	admin_id: number;
	total_votes: number | null;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

export class Election extends Model<ElectionAttributes> {
	public id!: number;
	public description!: string;
	public admin_id!: number;
	public total_votes!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
	public deletedAt!: Date;
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
		admin_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: Admin,
				key: 'id',
			},
			onDelete: 'NO ACTION',
		},
		total_votes: {
			type: DataTypes.BIGINT,
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
		modelName: 'election',
	}
);
