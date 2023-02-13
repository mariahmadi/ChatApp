const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter a email'],
        // unique: true,
        // lowercase: true,
        //validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        //minlength: [6, 'The password should be at least 6 characters long']
    },
})
UserSchema.pre('save', function (next) {
    var password = this.password
    // generate a salt
    const salt = bcrypt.genSalt()


    // hash the password using our new salt
    bcrypt.hash(password, 10)
    next()
})

UserSchema.static.login = async (email, password) => {
    try {
        const user = this.find({ email })
        if (user) {
            const match = await bcrypt.compare(password, user.password)
            try {
                if (match) {
                    return user
                }
            } catch (error) {
                console.log("Pasword Is Incoorect")
            }
        }
    } catch (error) {
        throw Error("Email Is Invalid")
    }
}


const USER = mongoose.model("USER", UserSchema)
module.exports = USER
