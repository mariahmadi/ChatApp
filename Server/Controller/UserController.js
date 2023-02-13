const JWT = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const mongoose = require('mongoose')
const USER = require('../Models/UserModel')
const cookieparser = require('cookie-parser')
const create = require("../Services/Utils")
const createToken = require('../Services/Utils')

//Sign Up User
module.exports.SignUp = async (req, res) => {

    try {
        console.log(req.body)
        const { username, email, password, confirmpassword } = req.body
        const newUser = new USER({
            email: email,
            username: username,
            password: password
        })
        await newUser.save()
        res.json({ user: newUser })

    }
    catch (error) {
        console.log(error)

    }
}
// Login User
module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await USER.login(email, password)
        console.log(user)
        const token = createToken(user._id)
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 })


        res.json(user)
    } catch (error) {
        console.log(error)
    }


}

//LogOut User
module.exports.Logout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.json("Logout")
    } catch (error) {
        console.log(error)
    }


}
module.exports.Verify = async (req, res, next) => {
    const token = req.cookie.token
    try {

        if (token) {
            JWT.verify(token, "secret", (err, decoded) => {
                if (err) {
                    console.log(err)

                }
                else {
                    const user = USER.findById(decoded.id)
                    res.json(user)
                    next()
                }
            })
        }
    } catch (error) {
        console.log(error)
        next()
    }

}