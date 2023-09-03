import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database.connection';
import { Election } from '../election/election.model';
import { Student } from '../student/student.model';

interface ListAttributes {
	id: number | null;
	election_id: number;
	description: string;
	image_url: string;
	votes: number | null;
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

export class List extends Model<ListAttributes> {
	public id!: number;
	public election_id!: number;
	public description!: string;
	public image_url!: string;
	public votes!: number;
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

List.init(
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		election_id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Election,
				key: 'id',
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image_url: {
			type: DataTypes.BLOB,
			allowNull: false,
		},
		votes: {
			type: DataTypes.BIGINT,
			allowNull: true,
			defaultValue: 0,
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
		modelName: 'list',
	}
);
