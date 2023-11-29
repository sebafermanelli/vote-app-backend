import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { Admin } from '../admin/admin.model';

interface ElectionAttributes {
	id: number;
	description: string;
	totalVotes: number;
	finalizated: boolean;
	fechaHoraFin: Date;
	adminId: number;
	createdAt: Date;
	updatedAt: Date;
}

export class Election extends Model<ElectionAttributes> {
	public id!: number;
	public description!: string;
	public totalVotes!: number;
	public finalizated!: boolean;
	public fechaHoraFin!: Date;
	public adminId!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Election.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		totalVotes: {
			type: DataTypes.BIGINT,
			defaultValue: 0,
			field: 'total_votes',
		},
		finalizated: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		fechaHoraFin: {
			type: DataTypes.DATE,
			field: 'fecha_hora_fin',
		},
		adminId: {
			type: DataTypes.BIGINT,
			allowNull: true,
			references: {
				model: Admin,
				key: 'id',
			},
			onDelete: 'SET NULL',
			field: 'admin_id',
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
