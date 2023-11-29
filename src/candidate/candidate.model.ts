import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { User } from '../user/user.model';

interface CandidateAttributes {
	id: number;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

export class Candidate extends Model<CandidateAttributes> {
	public id!: number;
	public userId!: string;
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
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
			onDelete: 'CASCADE',
			field: 'user_id',
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
