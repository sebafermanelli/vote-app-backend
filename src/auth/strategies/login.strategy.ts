import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { Admin } from '../../admin/admin.model';
import { AuthService } from '../auth.service';
import { PassportUse } from '../../utils/passport.use';
import { Student } from '../../student/student.model';

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

	async validateStudent(
		id: string,
		login_code: string,
		done: any
	): Promise<Student> {
		const student = await authService.validateStudent(id, login_code);
		if (!student) {
			return done(null, false, { message: 'Invalid id or code' });
		}

		return done(null, student);
	}

	get useStudent() {
		return PassportUse<LocalStrategy, Object, VerifyFunction>(
			'loginStudent',
			LocalStrategy,
			{
				idField: 'id',
				login_codeField: 'login_code',
			},
			this.validateStudent
		);
	}
}
