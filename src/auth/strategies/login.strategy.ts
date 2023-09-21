import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { Admin } from '../../admin/admin.model';
import { AuthService } from '../auth.service';
import { PassportUse } from '../../utils/passport.use';
import { User } from '../../user/user.model';

const authService: AuthService = new AuthService();

export class LoginStrategy {
	async validateAdmin(
		username: string,
		password: string,
		done: any
	): Promise<Admin> {
		const admin = await authService.validateAdmin(username, password);
		if (!admin) {
			return done(null, false, { message: 'Invalid username or password' });
		}

		return done(null, admin);
	}

	get useAdmin() {
		return PassportUse<LocalStrategy, Object, VerifyFunction>(
			'loginAdmin',
			LocalStrategy,
			{
				usernameField: 'username',
				passwordField: 'password',
			},
			this.validateAdmin
		);
	}

	async validateUser(id: string, login_code: string, done: any): Promise<User> {
		const user = await authService.validateUser(id, login_code);

		if (!user) {
			return done(null, false, { message: 'Invalid id or code' });
		}

		return done(null, user);
	}

	get useUser() {
		return PassportUse<LocalStrategy, Object, VerifyFunction>(
			'loginUser',
			LocalStrategy,
			{
				usernameField: 'id',
				passwordField: 'login_code',
			},
			this.validateUser
		);
	}
}
