import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { Election } from '../election/election.model';
import { User } from '../user/user.model';

interface ListAttributes {
	id: number;
	description: string;
	votes: number;
	electionId: number;
	rol1Id: string;
	rol2Id: string;
	rol3Id: string;
	createdAt: Date;
	updatedAt: Date;
}

export class List extends Model<ListAttributes> {
	public id!: number;
	public description!: string;
	public votes!: number;
	public electionId!: number;
	public rol1Id!: string;
	public rol2Id!: string;
	public rol3Id!: string;
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
		electionId: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Election,
				key: 'id',
			},
			onDelete: 'CASCADE',
			field: 'election_id',
		},
		rol1Id: {
			type: DataTypes.STRING,
			references: {
				model: User,
				key: 'id',
			},
			onDelete: 'CASCADE',
			field: 'rol1_id',
		},
		rol2Id: {
			type: DataTypes.STRING,
			references: {
				model: User,
				key: 'id',
			},
			onDelete: 'CASCADE',
			field: 'rol2_id',
		},
		rol3Id: {
			type: DataTypes.STRING,
			references: {
				model: User,
				key: 'id',
			},
			onDelete: 'CASCADE',
			field: 'rol3_id',
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
