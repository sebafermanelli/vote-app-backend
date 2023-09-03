import * as dotenv from 'dotenv';
import { Strategy as JwtStr, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportUse } from '../../utils/passport.use';
import { AuthService } from '../auth.service';

dotenv.config();

export class JwtStrategy extends AuthService {
	constructor() {
		super();
	}

	async validate(payload: string, done: any) {
		return done(null, payload);
	}

	get use() {
		return PassportUse<
			JwtStr,
			StrategyOptions,
			(payload: string, done: any) => Promise<string>
		>(
			'jwt',
			JwtStr,
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: process.env.JWT_SECRET,
				ignoreExpiration: false,
			},
			this.validate
		);
	}
}
