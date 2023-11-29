import { DataTypes, Model } from 'sequelize';
import { User } from '../user/user.model';
import { sequelize } from '../config/db/database.connection';
import { Election } from '../election/election.model';

interface ElectionUserAttributes {
	id: number;
	alreadyVote: boolean;
	userId: string;
	electionId: number;
	createdAt: Date;
	updatedAt: Date;
}

export class ElectionUser extends Model<ElectionUserAttributes> {
	public id!: number;
	public alreadyVote!: boolean;
	public userId!: string;
	public electionId!: number;
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
		alreadyVote: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			field: 'already_vote',
		},
		userId: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
			onDelete: 'CASCADE',
			field: 'user_id',
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
