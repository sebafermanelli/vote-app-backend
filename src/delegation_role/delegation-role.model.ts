import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db/database.connection';
import { Role } from '../role/role.model';
import { Delegation } from '../delegation/delegation.model';
import { ListRole } from '../list_role/list-role.model';

interface DelegationRoleAttributes {
	id: number;
	order: number;
	delegation_id: number;
	role_id: number;
	list_role: number;
	createdAt: Date;
	updatedAt: Date;
}

export class DelegationRole extends Model<DelegationRoleAttributes> {
	public id!: number;
	public order!: number;
	public delegation_id!: number;
	public role_id!: number;
	public list_role!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

DelegationRole.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		order: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		delegation_id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			references: {
				model: Delegation,
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
		list_role: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			references: {
				model: ListRole,
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
		modelName: 'delegation_role',
	}
);
