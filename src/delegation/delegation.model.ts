import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database.connection';
import { Election } from '../election/election.model';
import { Student } from '../student/student.model';

interface DelegationAttributes {
	election_id: number;
	president_id: string;
	secretary_id: string;
	delegate1_id: string;
	delegate2_id: string;
	delegate3_id: string;
	delegate4_id: string;
	delegate5_id: string;
	delegate6_id: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

export class Delegation extends Model<DelegationAttributes> {
	public election_id!: number;
	public president_id!: string;
	public secretary_id!: string;
	public delegate1_id!: string;
	public delegate2_id!: string;
	public delegate3_id!: string;
	public delegate4_id!: string;
	public delegate5_id!: string;
	public delegate6_id!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
	public deletedAt!: Date;
}

Delegation.init(
	{
		election_id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Election,
				key: 'id',
			},
		},
		president_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: Student,
				key: 'id',
			},
		},
		secretary_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: Student,
				key: 'id',
			},
		},
		delegate1_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: Student,
				key: 'id',
			},
		},
		delegate2_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: Student,
				key: 'id',
			},
		},
		delegate3_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: Student,
				key: 'id',
			},
		},
		delegate4_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: Student,
				key: 'id',
			},
		},
		delegate5_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: Student,
				key: 'id',
			},
		},
		delegate6_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: Student,
				key: 'id',
			},
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
		modelName: 'delegation',
	}
);
