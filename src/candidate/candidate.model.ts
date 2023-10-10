import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { User } from '../user/user.model';

interface CandidateAttributes {
	id: number;
	user_id: string;
	createdAt: Date;
	updatedAt: Date;
}

export class Candidate extends Model<CandidateAttributes> {
	public id!: number;
	public user_id!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Candidate.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
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
		modelName: 'candidate',
	}
);
