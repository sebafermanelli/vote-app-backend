import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { Election } from '../election/election.model';
import { User } from '../user/user.model';

interface DelegationAttributes {
	id: number;
	election_id: number;
	rol1_id: string;
	rol2_id: string;
	rol3_id: string;
	createdAt: Date;
	updatedAt: Date;
}

export class Delegation extends Model<DelegationAttributes> {
	public id!: number;
	public election_id!: number;
	public rol1_id!: string;
	public rol2_id!: string;
	public rol3_id!: string;
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
		election_id: {
			type: DataTypes.BIGINT,
			unique: true,
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
		modelName: 'delegation',
	}
);
