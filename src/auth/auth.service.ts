import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Admin } from '../admin/admin.model';
import { PayloadTokenAdmin, PayloadTokenUser } from './auth.interface';
import { User } from '../user/user.model';
import { Op } from 'sequelize';

dotenv.config();

export class AuthService {
	constructor(private readonly jwtInstance = jwt) {}

	//JWT_SECRET

	sign(payload: jwt.JwtPayload, secret: any) {
		return this.jwtInstance.sign(payload, secret, { expiresIn: '1h' });
	}

	public async validateAdmin(username: string, password: string): Promise<Admin | null> {
		const adminByUsername = await Admin.findOne({ where: { username } });
		if (adminByUsername) {
			const isMatch = await bcrypt.compare(password, adminByUsername.password);
			if (!isMatch) {
				return null;
			}
		}
		return adminByUsername;
	}

	public async generateAdminJWT(admin: Admin): Promise<{ accessToken: string; admin: Admin }> {
		const { username } = admin;
		const adminConsult = await Admin.findOne({ where: { username } });

		const payload: PayloadTokenAdmin = {
			username: adminConsult!.username,
			sub: String(adminConsult!.id),
		};

		if (adminConsult) {
			admin.password = 'Not permission';
		}

		return {
			accessToken: this.sign(payload, process.env.JWT_SECRET),
			admin,
		};
	}

	public async validateUser(id: string, login_code: string): Promise<User | null> {
		const userById = await User.findOne({ where: { [Op.or]: [{ id }, { email: id }] } });
		if (userById) {
			if (login_code !== userById.login_code) {
				return null;
			}
			return userById;
		}
		return null;
	}

	public async generateUserJWT(user: User): Promise<{ accessToken: string; user: User }> {
		const { id } = user;
		const userConsult = await User.findOne({ where: { [Op.or]: [{ id }, { email: id }] } });

		const payload: PayloadTokenUser = {
			id: userConsult!.id,
			sub: userConsult!.login_code,
		};

		if (userConsult) {
			user.login_code = 'Not permission';
		}

		return {
			accessToken: this.sign(payload, process.env.JWT_SECRET),
			user,
		};
	}
}
