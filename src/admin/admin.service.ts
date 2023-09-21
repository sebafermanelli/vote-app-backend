import { Admin } from './admin.model';
import bcrypt from 'bcrypt';

export class AdminService {
	constructor() {}

	async findAllAdmin(): Promise<Admin[]> {
		return await Admin.findAll();
	}

	async findAdminById(id: number): Promise<Admin | null> {
		return await Admin.findOne({ where: { id } });
	}

	async createAdmin(body: Admin): Promise<Admin> {
		const { password } = body;
		const hashedPassword = await bcrypt.hash(password, 10);
		body.password = hashedPassword;
		return await Admin.create(body);
	}

	async updateAdmin(id: number, body: Admin): Promise<[affectedCount: number]> {
		const { password } = body;
		const hashedPassword = await bcrypt.hash(password, 10);
		body.password = hashedPassword;
		return await Admin.update(body, { where: { id } });
	}

	async deleteAdmin(id: number): Promise<number> {
		return await Admin.destroy({ where: { id } });
	}

	async findAdminByUsername(username: string): Promise<Admin | null> {
		return await Admin.findOne({ where: { username } });
	}
}
