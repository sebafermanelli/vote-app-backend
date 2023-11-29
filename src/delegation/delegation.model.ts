import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { Election } from '../election/election.model';
import { User } from '../user/user.model';

interface DelegationAttributes {
	id: number;
	electionId: number;
	rol1Id: string;
	rol2Id: string;
	rol3Id: string;
	createdAt: Date;
	updatedAt: Date;
}

export class Delegation extends Model<DelegationAttributes> {
	public id!: number;
	public electionId!: number;
	public rol1Id!: string;
	public rol2Id!: string;
	public rol3Id!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Delegation.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		electionId: {
			type: DataTypes.BIGINT,
			unique: true,
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
		modelName: 'delegation',
	}
);
