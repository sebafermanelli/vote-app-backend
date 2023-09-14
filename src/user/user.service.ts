import { Op } from 'sequelize';
import { User } from './user.model';

export class UserService {
	constructor() {}

	async findAllUser(): Promise<User[]> {
		return await User.findAll();
	}

	async findUserById(id: string): Promise<User | null> {
		return await User.findOne({ where: { id } });
	}

	async createUser(body: User): Promise<User> {
		return await User.create(body);
	}

	async updateUser(id: string, body: User): Promise<[affectedCount: number]> {
		return await User.update(body, { where: { id } });
	}

	async deleteUser(id: string): Promise<number> {
		return await User.destroy({ where: { id } });
	}

	async findUserByIdOrEmail(id: string, email: string): Promise<User | null> {
		return await User.findOne({
			where: {
				[Op.or]: [{ id }, { email }],
			},
		});
	}
}
