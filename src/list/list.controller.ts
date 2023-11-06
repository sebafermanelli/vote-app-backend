import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { List } from './list.model';

export class ListController {
	constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

	async getLists(req: Request, res: Response) {
		try {
			const data = await List.findAll();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getListById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await List.findOne({ where: { id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async createList(req: Request, res: Response) {
		try {
			const data = await List.create(req.body);
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateList(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await List.update(req.body, { where: { id } });

			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteList(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await List.destroy({ where: { id } });
			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}
}
