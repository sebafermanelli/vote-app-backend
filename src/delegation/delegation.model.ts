import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { Election } from '../election/election.model';

interface DelegationAttributes {
	id: number;
	election_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export class Delegation extends Model<DelegationAttributes> {
	public id!: number;
	public election_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Delegation.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
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
