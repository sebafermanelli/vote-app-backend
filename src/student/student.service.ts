import { Op } from 'sequelize';
import { Student } from './student.model';

export class StudentService {
	constructor() {}

	async findAllStudent(): Promise<Student[]> {
		return await Student.findAll();
	}

	async findStudentById(id: string): Promise<Student | null> {
		return await Student.findOne({ where: { id } });
	}

	async findStudentByIdOrEmail(
		id: string,
		email: string
	): Promise<Student | null> {
		return await Student.findOne({
			where: {
				[Op.or]: [{ id }, { email }],
			},
		});
	}

	async createStudent(body: Student): Promise<Student> {
		return await Student.create(body);
	}

	async deleteStudent(id: string): Promise<number> {
		return await Student.destroy({ where: { id } });
	}

	async updateStudent(
		id: string,
		body: Student
	): Promise<[affectedCount: number]> {
		return await Student.update(body, { where: { id } });
	}
}
