import { Request, Response } from 'express';
import { HttpResponse } from '../utils/http.response';
import { StudentService } from './student.service';
import sendEmail from '../utils/mailer';

export class StudentController {
	constructor(
		private readonly studentService: StudentService = new StudentService(),
		private readonly httpResponse: HttpResponse = new HttpResponse()
	) {}

	async getStudents(req: Request, res: Response) {
		try {
			const data = await this.studentService.findAllStudent();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getStudentById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.studentService.findStudentById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async createStudent(req: Request, res: Response) {
		const { id, email } = req.body;
		try {
			const data = await this.studentService.findStudentByIdOrEmail(id, email);
			if (data != null) {
				return this.httpResponse.Error(res, 'Existe dato');
			}
			const student = await this.studentService.createStudent(req.body);
			return this.httpResponse.Ok(res, student);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async updateStudent(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.studentService.updateStudent(id, req.body);

			if (!data) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}

			return this.httpResponse.Ok(res, data);
		} catch (error) {
			console.error(error);
			return this.httpResponse.Error(res, error);
		}
	}

	async generateCode(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.studentService.findStudentById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			let randomCode = '';
			for (let i = 0; i < 6; i++) {
				const number = Math.floor(Math.random() * 10);
				randomCode += number;
			}
			data.login_code = randomCode;
			await data.save();
			sendEmail({
				to: data.email,
				subject: 'Codigo de ingreso',
				html: `El codigo para ingresar al sistema de votacion es: ${randomCode}`,
			});
			return this.httpResponse.Ok(res, 'Codigo enviado');
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteStudent(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.studentService.deleteStudent(id);
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
