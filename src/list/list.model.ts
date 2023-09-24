import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { Election } from '../election/election.model';

interface ListAttributes {
	id: number;
	description: string;
	image: string;
	votes: number;
	election_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export class List extends Model<ListAttributes> {
	public id!: number;
	public description!: string;
	public image!: string;
	public votes!: number;
	public election_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

List.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.BLOB,
		},
		votes: {
			type: DataTypes.BIGINT,
			defaultValue: 0,
		},
		election_id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Election,
				key: 'id',
			},
			onDelete: 'CASCADE',
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
		modelName: 'list',
	}
);
