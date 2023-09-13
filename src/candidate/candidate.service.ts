import { Candidate } from './candidate.model';

export class CandidateService {
	constructor() {}

	async findAllCandidate(): Promise<Candidate[]> {
		return await Candidate.findAll();
	}

	async findCandidateById(id: number): Promise<Candidate | null> {
		return await Candidate.findOne({ where: { id } });
	}

	async findCandidateByUserId(user_id: string): Promise<Candidate | null> {
		return await Candidate.findOne({ where: { user_id } });
	}

	async createCandidate(body: Candidate): Promise<Candidate> {
		return await Candidate.create(body);
	}

	async deleteCandidate(id: string): Promise<number> {
		return await Candidate.destroy({ where: { id } });
	}

	async updateCandidate(
		id: string,
		body: Candidate
	): Promise<[affectedCount: number]> {
		return await Candidate.update(body, { where: { id } });
	}
}
