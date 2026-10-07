import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (registerData) => {
    try {
        const { name, email, password } = registerData;

        // Check if email already exists
        const [existingUser] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            throw new Error("Email already registered");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Insert user
        await db.query(
            `INSERT INTO users 
            (name, email, password)
            VALUES (?, ?, ?)`,
            [
                name,
                email,
                hashedPassword
            ]
        );

        return {
            message: "Registration successful",
            user: {
                name,
                email
            }
        };

    } catch (error) {
        throw error;
    }
};


export const loginUser = async (loginData) => {
    try {
        const { email, password } = loginData;

        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            throw new Error("Invalid email or password");
        }

        const user = users[0];

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return {
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };

    } catch (error) {
        throw error;
    }
};