import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { ListService } from './list.service';

export class ListController {
	constructor(
		private readonly listService: ListService = new ListService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getLists(req: Request, res: Response) {
		try {
			const data = await this.listService.findAllList();
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
			const data = await this.listService.findListById(Number(id));
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
			const list = await this.listService.createList(req.body);
			return this.httpResponse.Ok(res, list);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateList(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.listService.updateList(Number(id), req.body);

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
			const data = await this.listService.deleteList(Number(id));
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
