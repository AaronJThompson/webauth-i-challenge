const router = require('express').Router();
const UsersDB = require('./users-model');
const bcrypt = require('bcrypt');

function resricted(req, res, next) {
    if(req.session && req.session.user) {
        next();
        return;
    } else {
        res.status(401).send("Unauthorized!");
    }
}

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 12);

    try {
        res.status(201).json(await UsersDB.add(username, hash));
    } catch (error) {
        res.status(500).json({ error: "Coudln't create user" });
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UsersDB.findByUsername(username).first();
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            res.status(200).json({
              message: `Welcome ${user.username}!`,
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/users', resricted, async (req, res) => {
    try {
        const users = await UsersDB.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Couln't get users" });
    }
})
module.exports = router;