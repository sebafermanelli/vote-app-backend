import { Op } from 'sequelize';
import { ElectionUser } from './election_user.model';

export class ElectionUserService {
	constructor() {}

	async findAllElectionUser(): Promise<ElectionUser[]> {
		return await ElectionUser.findAll();
	}

	async findElectionUserById(id: number): Promise<ElectionUser | null> {
		return await ElectionUser.findOne({ where: { id } });
	}

	async createElectionUser(body: ElectionUser): Promise<ElectionUser> {
		return await ElectionUser.create(body);
	}

	async createElectionUsers(body: ElectionUser[]): Promise<ElectionUser[]> {
		return await ElectionUser.bulkCreate(body);
	}

	async updateElectionUser(id: number, body: ElectionUser): Promise<[affectedCount: number]> {
		return await ElectionUser.update(body, { where: { id } });
	}

	async deleteElectionUser(id: number): Promise<number> {
		return await ElectionUser.destroy({ where: { id } });
	}

	async findElectionUsersByElectionId(election_id: number): Promise<ElectionUser[] | null> {
		return await ElectionUser.findAll({ where: { election_id } });
	}

	async findElectionUserByUserId(user_id: number): Promise<ElectionUser | null> {
		return await ElectionUser.findOne({ where: { user_id } });
	}

	async findElectionUserByElectionIdAndUserId(election_id: number, user_id: number): Promise<ElectionUser | null> {
		return await ElectionUser.findOne({
			where: { [Op.and]: [{ election_id }, { user_id }] },
		});
	}

	async addVoteElectionUser(id: number, body: ElectionUser): Promise<[affectedCount: number]> {
		return await ElectionUser.update(body, { where: { id } });
	}
}
