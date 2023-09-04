import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/admin.model';
import { PayloadTokenAdmin, PayloadTokenStudent } from './auth.interface';
import { Student } from '../student/student.model';
import { StudentService } from '../student/student.service';

dotenv.config();

export class AuthService {
	constructor(
		private readonly adminService: AdminService = new AdminService(),
		private readonly studentService: StudentService = new StudentService(),
		private readonly jwtInstance = jwt
	) {}

	//JWT_SECRET

	sing(payload: jwt.JwtPayload, secret: any) {
		return this.jwtInstance.sign(payload, secret, { expiresIn: '1h' });
	}

	public async validateAdmin(
		username: string,
		password: string
	): Promise<Admin | null> {
		const adminByUsername = await this.adminService.findAdminByUsername(
			username
		);
		if (adminByUsername) {
			const isMatch = await bcrypt.compare(password, adminByUsername.password);
			if (!isMatch) {
				return null;
			}
		}
		return adminByUsername;
	}

	public async generateAdminJWT(
		admin: Admin
	): Promise<{ accessToken: string; admin: Admin }> {
		const adminConsult = await this.adminService.findAdminByUsername(
			admin.username
		);

		const payload: PayloadTokenAdmin = {
			username: adminConsult!.username,
			sub: String(adminConsult!.id),
		};

		if (adminConsult) {
			admin.password = 'Not permission';
		}

		return {
			accessToken: this.sing(payload, process.env.JWT_SECRET),
			admin,
		};
	}

	public async validateStudent(
		id: string,
		login_code: string
	): Promise<Student | null> {
		const studentById = await this.studentService.findStudentById(id);
		if (studentById) {
			if (login_code !== studentById.login_code) {
				return null;
			}
			return studentById;
		}
		return null;
	}

	public async generateStudentJWT(
		student: Student
	): Promise<{ accessToken: string; student: Student }> {
		const studentConsult = await this.studentService.findStudentById(
			student.id
		);

		const payload: PayloadTokenStudent = {
			id: studentConsult!.id,
			sub: studentConsult!.login_code,
		};

		if (studentConsult) {
			student.login_code = 'Not permission';
		}

		return {
			accessToken: this.sing(payload, process.env.JWT_SECRET),
			student,
		};
	}
}
