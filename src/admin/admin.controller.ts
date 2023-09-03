import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { AdminService } from './admin.service';

export class AdminController {
	constructor(
		private readonly adminService: AdminService = new AdminService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getAdmins(req: Request, res: Response) {
		try {
			const data = await this.adminService.findAllAdmin();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getAdminByUsername(req: Request, res: Response) {
		const { username } = req.params;
		try {
			const data = await this.adminService.findAdminByUsername(username);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async createAdmin(req: Request, res: Response) {
		const { username } = req.body;
		try {
			const data = await this.adminService.findAdminByUsername(username);
			if (data != null) {
				return this.httpResponse.Error(res, 'Existe dato');
			}
			const admin = await this.adminService.createAdmin(req.body);
			return this.httpResponse.Ok(res, admin);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateAdmin(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.adminService.updateAdmin(Number(id), req.body);

			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteAdmin(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.adminService.deleteAdmin(Number(id));
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
