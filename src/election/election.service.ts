import { Election } from './election.model';

export class ElectionService {
	constructor() {}

	async findAllElection(): Promise<Election[]> {
		return await Election.findAll();
	}

	async findElectionById(id: number): Promise<Election | null> {
		return await Election.findOne({ where: { id } });
	}

	async createElection(body: Election): Promise<Election> {
		return await Election.create(body);
	}

	async updateElection(
		id: number,
		body: Election
	): Promise<[affectedCount: number]> {
		return await Election.update(body, { where: { id } });
	}

	async deleteElection(id: number): Promise<number> {
		return await Election.destroy({ where: { id } });
	}

	async findElectionsByAdminId(admin_id: number): Promise<Election[] | null> {
		return await Election.findAll({ where: { admin_id } });
	}
}
