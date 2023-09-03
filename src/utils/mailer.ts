import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

let transporter = nodemailer.createTransport({
	service: 'outlook',
	secure: false,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

interface EmailParams {
	to: string;
	subject: string;
	html: string;
}

const sendEmail = async ({ to, subject, html }: EmailParams) => {
	try {
		const result = await transporter.sendMail({
			from: process.env.EMAIL,
			to,
			subject,
			html,
		});

		console.log({ result });
		return { message: 'Email enviado exitosamente' };
	} catch (error) {
		console.log(error);
		return { message: 'Hubo un problema al enviar el email', error };
	}
};

export default sendEmail;
