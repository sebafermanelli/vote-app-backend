import { BaseRouter } from '../utils/shared.router';
import { StudentController } from './student.controller';
import { StudentMiddleware } from './student.middleware';

export class StudentRouter extends BaseRouter<
	StudentController,
	StudentMiddleware
> {
	constructor() {
		super(StudentController, StudentMiddleware);
	}

	routes(): void {
		this.router.get(
			'/students',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.getStudents(req, res)
		);
		this.router.get(
			'/students/student/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkStudentRole(req, res, next)],
			(req, res) => this.controller.getStudentById(req, res)
		);
		this.router.post(
			'/students/register',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res, next) => [this.middleware.studentValidator(req, res, next)],
			(req, res) => this.controller.createStudent(req, res)
		);
		this.router.put(
			'/students/update/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateStudent(req, res)
		);
		this.router.put('/students/code/:id', (req, res) =>
			this.controller.generateCode(req, res)
		);
		this.router.delete(
			'/students/delete/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteStudent(req, res)
		);
	}
}
