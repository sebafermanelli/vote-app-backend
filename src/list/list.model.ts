import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { Election } from '../election/election.model';
import { User } from '../user/user.model';

interface ListAttributes {
	id: number;
	description: string;
	votes: number;
	election_id: number;
	rol1_id: string;
	rol2_id: string;
	rol3_id: string;
	createdAt: Date;
	updatedAt: Date;
}

export class List extends Model<ListAttributes> {
	public id!: number;
	public description!: string;
	public votes!: number;
	public election_id!: number;
	public rol1_id!: string;
	public rol2_id!: string;
	public rol3_id!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

List.init(
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
		rol1_id: {
			type: DataTypes.STRING,
			references: {
				model: User,
				key: 'id',
			},
			onDelete: 'CASCADE',
		},
		rol2_id: {
			type: DataTypes.STRING,
			references: {
				model: User,
				key: 'id',
			},
			onDelete: 'CASCADE',
		},
		rol3_id: {
			type: DataTypes.STRING,
			references: {
				model: User,
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
