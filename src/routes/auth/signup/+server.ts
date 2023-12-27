import { json } from '@sveltejs/kit';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import bcrypt from 'bcrypt';
import prisma from '$lib/server/primsa';

const saltRounds = 5;

export async function POST({ request }: { request: Request }) {
	const formData = await request.formData();

	let username = formData.get('username');
	let password = formData.get('password');
	let email = formData.get('email');

	if (!username || !password || !email) {
		return json({ status: 400, success: false, error: 'username, password or email is null' });
	}

	username = username.toString();
	email = email.toString();

	password = password.toString();
	password = await bcrypt.hash(password, saltRounds);

	try {
		await prisma.user.create({
			data: {
				username,
				password,
				email
			}
		});
	} catch (err) {
		console.error(err);
		if (err instanceof PrismaClientKnownRequestError) {
			return json({ status: 400, success: false, error: 'username or email already exixts' });
		}
		return json({ status: 500, success: false, error: 'could not create user' });
	}

	return json({ status: 200, success: true, error: 'successfully added a new user' });
}
