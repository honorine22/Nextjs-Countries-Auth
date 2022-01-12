const assert = require('assert');
const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
const jwt = require('jsonwebtoken');
const saltRounds = 10;
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

function createUser(db, names, email, dob, country, password, check, callback) {
    const collection = db.collection('users');
    bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.

        collection.insertOne(
            {
                userId: v4(),
                names,
                email,
                dob,
                country,
                password: hash,
                check
            },
            function (err, userCreated) {
                assert.equal(err, null);
                callback(userCreated);
            },
        );
    });
}

export default (req, res) => {
    if (req.method !== 'POST') {
        return;
    }

    //Getting email and password from body
    const { email, password } = req.body;

    // if (!email || !email.includes('@') || !password || password.trim().length < 6 || !names || !dob || !country || !check) {
    //     res.status(422).json({
    //         message:
    //             'Invalid input - password should also be at least 6 characters long.'
    //     });
    //     return;
    // }
    // Testing
    try {
        assert.notEqual(null, email, 'Email required');
        assert.notEqual(null, password, 'Password required');
    } catch (bodyError) {
        res.status(403).json({ error: true, message: bodyError.message });
    }

    // verify email does not exist already
    client.connect(function (err) {
        assert.equal(null, err);
        console.log('Connected to MongoDB server....');
        const db = client.db();
        const names = req.body.names;
        const dob = req.body.dob;
        const email = req.body.email;
        const password = req.body.password;
        const country = req.body.country;
        const check = req.body.check;

        findUser(db, email, function (err, user) {
            if (err) {
                res.status(500).json({ error: true, message: 'Error finding User' });
                return;
            }

            if (!user) {
                createUser(db, names, email, dob, country, password, check, function (creationResult) {
                    if (creationResult.ops.length === 1) {
                        const user = creationResult.ops[0];
                        const token = jwt.sign(
                            { userId: user.userId, email: user.email },
                            jwtSecret,
                            {
                                expiresIn: 3000, //50 minutes
                            },
                        );
                        res.status(200).json({ token });
                        return;
                    }
                })
            } else {
                res.status(403).json({ message: 'User already exists' });
                return;
            }
        })
    })
}