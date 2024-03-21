const User = require("../models/userModel")
const { hashPassword, comparePassword } = require("../utils/hashPassword")
const JWT = require("jsonwebtoken")

exports.registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body

        // Check for empty fields
        if (!name || !password || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // Check for user already registered
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            })
        }

        // Generate hashed password
        const hash = await hashPassword(password);

        // Create new user
        const newUser = await User.create({ name, email, password: hash });

        const token = JWT.sign({ _id: newUser._id, name: newUser.name, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "24h" })

        return res.status(200).json({
            success: true,
            message: "User created successful",
            data: {
                token
            }
        });


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }


}

exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        // Check for empty fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // Check for wrong email or password
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        // Compare password
        const compare = await comparePassword(password, user.password)

        if (!compare) {
            return res.status(404).json({
                success: false,
                message: "Password Doesn't Match"
            });
        }

        const token = JWT.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "24h" });


        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token
            }
        });


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

}


exports.deleteAllUsers = async (req, res) => {

    try {

        const users = await User.deleteMany()

        if (users) {
            return res.status(200).json({
                success: true,
                message: "All users deleted successfully"
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

