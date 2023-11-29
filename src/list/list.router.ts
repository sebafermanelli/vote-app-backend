import { BaseRouter } from '../utils/shared.router';
import { ListController } from './list.controller';
import { ListMiddleware } from './list.middleware';

export class ListRouter extends BaseRouter<ListController, ListMiddleware> {
	constructor() {
		super(ListController, ListMiddleware);
	}

	routes(): void {
		this.router.get(
			'/lists',
			(req, res, next) => this.middleware.checkUserRole(req, res, next, 'jwt'),
			(req, res) => this.controller.getLists(req, res)
		);
		this.router.post(
			'/lists',
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res, next) => this.middleware.listValidator(req, res, next),
			(req, res) => this.controller.createList(req, res)
		);
		this.router.put(
			'/lists/:id',
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res) => this.controller.updateList(req, res)
		);
		this.router.delete(
			'/lists/:id',
			(req, res, next) => this.middleware.checkAdminRole(req, res, next, 'jwt'),
			(req, res) => this.controller.deleteList(req, res)
		);
		this.router.get(
			'/lists/:id',
			(req, res, next) => this.middleware.checkUserRole(req, res, next, 'jwt'),
			(req, res) => this.controller.getListById(req, res)
		);
	}
}
