import { List } from './list.model';

export class ListService {
	constructor() {}

	async findAllList(): Promise<List[]> {
		return await List.findAll();
	}

	async findListById(id: number): Promise<List | null> {
		return await List.findOne({ where: { id } });
	}

	async createList(body: List): Promise<List> {
		return await List.create(body);
	}

	async deleteList(id: number): Promise<number> {
		return await List.destroy({ where: { id } });
	}

	async updateList(id: number, body: List): Promise<[affectedCount: number]> {
		return await List.update(body, { where: { id } });
	}
}
