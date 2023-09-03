import { Admin } from './admin.model';
import bcrypt from 'bcrypt';

export class AdminService {
	constructor() {}

	async findAllAdmin(): Promise<Admin[]> {
		return await Admin.findAll();
	}

	async findAdminByUsername(username: string): Promise<Admin | null> {
		return await Admin.findOne({ where: { username } });
	}

	async createAdmin(body: Admin): Promise<Admin> {
		const { password } = body;
		const hashedPassword = await bcrypt.hash(password, 10);
		body.password = hashedPassword;
		return await Admin.create(body);
	}

	async deleteAdmin(id: number): Promise<number> {
		return await Admin.destroy({ where: { id } });
	}

	async updateAdmin(id: number, body: Admin): Promise<[affectedCount: number]> {
		return await Admin.update(body, { where: { id } });
	}
}
