import { DataTypes, Model } from 'sequelize';
import { Student } from '../student/student.model';
import { sequelize } from '../db/database.connection';
import { Election } from '../election/election.model';

interface ElectionStudentAttributes {
	election_id: number;
	student_id: string;
	already_vote: boolean;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

export class ElectionStudent extends Model<ElectionStudentAttributes> {
	public election_id!: number;
	public student_id!: string;
	public already_vote!: boolean;
	public createdAt!: Date;
	public updatedAt!: Date;
	public deletedAt!: Date;
}

ElectionStudent.init(
	{
		election_id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Election,
				key: 'id',
			},
		},
		student_id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Student,
				key: 'id',
			},
		},
		already_vote: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			field: 'created_at',
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: 'updated_at',
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
		deletedAt: {
			type: DataTypes.DATE,
			field: 'deleted_at',
			allowNull: true,
		},
	},
	{
		sequelize,
		paranoid: true,
		freezeTableName: true,
		modelName: 'election_student',
	}
);
