import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { Role } from '../role/role.model';
import { List } from '../list/list.model';
import { Candidate } from '../candidate/candidate.model';

interface ListRoleAttributes {
	id: number;
	order: number;
	list_id: number;
	role_id: number;
	candidate_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export class ListRole extends Model<ListRoleAttributes> {
	public id!: number;
	public order!: number;
	public list_id!: number;
	public role_id!: number;
	public candidate_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

ListRole.init(
	{
		id: {
			type: DataTypes.BIGINT,
			unique: true,
			autoIncrement: true,
		},
		order: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		list_id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			references: {
				model: List,
				key: 'id',
			},
			onDelete: 'CASCADE',
		},
		role_id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			references: {
				model: Role,
				key: 'id',
			},
			onDelete: 'CASCADE',
		},
		candidate_id: {
			type: DataTypes.BIGINT,
			unique: true,
			references: {
				model: Candidate,
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
		modelName: 'list_role',
	}
);
