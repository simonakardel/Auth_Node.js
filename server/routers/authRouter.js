import {
    Router
} from "express";
const router = Router();

import db from "../database/connection.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// REFRESHING ACCESS TOKENS
router.post("/token", async (req, res) => {
  
    // Getting the refreshToken from the cookies
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);
  
    try {
      const row = await db.get("SELECT * FROM refresh_tokens WHERE token = ?", [refreshToken]);
  
      if (!row) return res.sendStatus(403);
  
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
  
        const accessToken = generateAccessToken({
          name: user.name,
        });
        res.json({
          accessToken: accessToken,
        });
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  

// LOGOUT
router.delete("/logout", async (req, res) => {
    // Get the refreshToken from the cookies
    const refreshToken = req.cookies.refreshToken;
  
    // Check if refreshToken exists
    if (!refreshToken) {
      res.status(400).send("Refresh token not found");
      return;
    }
  
    try {
      const { changes } = await db.run("DELETE FROM refresh_tokens WHERE token = ?", [refreshToken]);
  
      if (changes > 0) {
        // Clear the refreshToken cookie
        res.clearCookie("refreshToken");
  
        res.sendStatus(200);
      } else {
        res.status(404).send("Token not found");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  

// SIGNUP
router.post("/signup", async (req, res) => {
    const {
        email,
        password
    } = req.body;

    // checking if email and password are provided
    if (!email || !password) {
        return res.status(400).send({
            message: "Missing email or password in the body"
        });
    }

    try {
        // checking if email already exists
        const existingEmail = await db.get("SELECT email FROM users WHERE email = ?", [email]);

        if (existingEmail) {
            return res.status(400).send({
                message: "Email already exists"
            });
        }

        // hashing password and creating a new user in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
        res.status(200).send({
            message: "user created successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body;

    // checking if email and password are provided
    if (!email || !password) {
        return res.status(400).send({
            message: "Missing email or password in the body"
        });
    }

    try {
        const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

        if (!user) {
            res.status(400).send("User not found");
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).send("Incorrect password");
        } else {
            const userObj = {
                email: user.email,
                id: user.id
            };
            const accessToken = generateAccessToken(userObj);
            const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET);
            await db.run("INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)", [user.id, refreshToken]);

            // Setting the refreshToken as an HttpOnly cookie
            res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
            // Sending only the accessToken in the response
            res.json({ accessToken: accessToken });

        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    });
}


export default router;