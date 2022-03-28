const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

module.exports = router;

// registering

router.post("/register", validInfo, async (req, res) => {
  try {
    // 1. destructure req.body(name, email, password)

    const { username, email, password } = req.body;
    // 2. check if user exists; if so, throw error

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists! Please login.");
    }

    // 3. bcrypt the user's password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. enter the new user inside db
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, bcryptPassword]
    );

    // 5. generate jwtoken
    const token = jwtGenerator(newUser.rows[0].user_id);
    const authUser = {
      userName: newUser.rows[0].user_name,
      userID: newUser.rows[0].user_id,
    };

    return res.json({ token, authUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// login route

router.post("/login", validInfo, async (req, res) => {
  try {
    //1.   destructure req.body
    const { username, password } = req.body;
    // 2. check if user doesn't exist, if not throw err

    const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).send("Username or password is incorrect.");
    }
    // 3. check if incoming password is same as db password

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Username or password is incorrect.");
    }
    // 4. give them jwt token
    if (validPassword) {
      const token = jwtGenerator(user.rows[0].user_id);
      const authUser = {
        userName: user.rows[0].user_name,
        userID: user.rows[0].user_id,
      };
      return res.json({ token, authUser });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// verification route

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json({ verified: true, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});
