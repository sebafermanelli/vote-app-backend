import { Delegation } from './delegation.model';

export class DelegationService {
	constructor() {}

	async findAllDelegation(): Promise<Delegation[]> {
		return await Delegation.findAll();
	}

	async findDelegationById(id: number): Promise<Delegation | null> {
		return await Delegation.findOne({ where: { id } });
	}

	async createDelegation(body: Delegation): Promise<Delegation> {
		return await Delegation.create(body);
	}

	async updateDelegation(
		id: string,
		body: Delegation
	): Promise<[affectedCount: number]> {
		return await Delegation.update(body, { where: { id } });
	}

	async deleteDelegation(id: string): Promise<number> {
		return await Delegation.destroy({ where: { id } });
	}

	async findDelegationByElectionId(
		election_id: number
	): Promise<Delegation | null> {
		return await Delegation.findOne({ where: { election_id } });
	}
}
