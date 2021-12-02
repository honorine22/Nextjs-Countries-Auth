import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';
async function handler(req, res) {
	//Only POST mothod is accepted
	if (req.method === 'POST') {
		//Getting email and password from body
		const { names, email, dob, country, password, check } = req.body;
		//Validate
		if (!email || !email.includes('@') || !password || password.trim().length < 6 || !names || !dob || !country || !check) {
			res.status(422).json({ message:  'Invalid input - password should also be at least 7 characters long.' });
			return;
		}
		//Connect with database
		const client = await connectToDatabase();
		const db = client.db();
		//Check existing
		const checkExisting = await db.collection('users').findOne({ email: email });
		//Send error response if duplicate user is found
		if (checkExisting) {
			res.status(422).json({ message: 'User already exists' });
			client.close();
			return;
		}
		//Hash password
		const hashedPassword = await hashPassword(password);
		const status = await db.collection('users').insertOne({
			names,
			email,
			dob,
			country,
			password: hashedPassword,
			check
		});
		//Send success response
		res.status(201).json({ message: 'User created!', ...status });
		//Close DB connection
		client.close();
	} else {
		//Response for other than POST method
		res.status(500).json({ message: 'Route not valid' });
	}
}

export default handler;
