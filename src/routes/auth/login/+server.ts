import { json } from '@sveltejs/kit';

import bcrypt from 'bcrypt';
import prisma from '$lib/server/primsa';

const saltRounds = 5;

export async function POST({ request }: { request: Request }) {
	const formData = await request.formData();

	let username = formData.get('username');
	let password = formData.get('password');

	if (!username || !password) {
		return json({ status: 400, success: false, error: 'username or password is null' });
	}

	username = username.toString();

	password = password.toString();
	password = await bcrypt.hash(password, saltRounds);

	try {
		const user = await prisma.user.findUnique({
			where: {
				username: username
			}
		});

		if (!user) {
			return json({
				status: 500,
				success: false,
				error: 'no user with that username, please signup'
			});
		}
        
		const passwordMatched = await bcrypt.compare(password, user.password);

		if (!passwordMatched) {
			return json({
				status: 500,
				success: false,
				error: 'wrong password for this user'
			});
		}

		return json(user);
	} catch (err) {
		console.error(err);
		return json({ status: 500, success: false, error: 'could not access user' });
	}
}
