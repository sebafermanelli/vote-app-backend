import { DataTypes, Model } from 'sequelize';
import { User } from '../user/user.model';
import { sequelize } from '../config/db/database.connection';
import { Election } from '../election/election.model';

interface ElectionUserAttributes {
	id: number;
	already_vote: boolean;
	user_id: string;
	election_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export class ElectionUser extends Model<ElectionUserAttributes> {
	public id!: number;
	public already_vote!: boolean;
	public user_id!: string;
	public election_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

ElectionUser.init(
	{
		id: {
			type: DataTypes.BIGINT,
			unique: true,
			autoIncrement: true,
		},
		already_vote: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
			onDelete: 'NO ACTION',
		},
		election_id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Election,
				key: 'id',
			},
			onDelete: 'NO ACTION',
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
		modelName: 'election_user',
	}
);
