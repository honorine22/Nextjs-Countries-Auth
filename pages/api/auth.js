const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'SUPERSECRETE20220';
const url = process.env.DB_URL;

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//Check verify user does not exist already
function findUser(db, email, callback) {
	const collection = db.collection('users');
	collection.findOne({ email }, callback);
}

function authUser(db, email, password, hash, callback) {
	const collection = db.collection('users');
	bcrypt.compare(password, hash, callback);
}


export default (req, res) => {

	if (req.method !== 'POST') {
		return;
	}

	//Getting email and password from body
	const { email, password } = req.body;
	try {
		assert.notEqual(null, email, 'Email required');
		assert.notEqual(null, password, 'Password required');
	} catch (bodyError) {
		res.status(403).send(bodyError.message);
	}
	client.connect(function (err) {
		assert.equal(null, err);
		console.log('Connected to MongoDB server....');
		const db = client.db();
		const email = req.body.email;
		const password = req.body.password;

		findUser(db, email, function (err, user) {
			if (err) {
				res.status(500).json({ error: true, message: 'Error finding User' });
				return;
			}
			if (!user) {
				res.status(404).json({ error: true, message: 'User not found' });
				return;
			} else {
				authUser(db, email, password, user.password, function (err, match) {
					if (err) {
						res.status(500).json({ error: true, message: 'Auth Failed' });
					}
					if (match) {
						const token = jwt.sign(
							{ userId: user.userId, email: user.email },
							jwtSecret,
							{
								expiresIn: 3000, //50 minutes
							},
						);
						res.status(200).json({ token });
						return;
					} else {
						res.status(401).json({ error: true, message: 'Auth Failed' });
						return;
					}
				})
			}
		})
	})
}