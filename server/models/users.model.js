const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be 2 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name must be 2 characters long"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(val) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email address is required"],
        minlength: [8, "Email must be at least 8 characters long"],
        maxlength: [50, "Email can only be 255 characters long"]
    },
    password: {
        type: String,
        unique: false,
        required: [true, "Password required"],
        minlength: [10, "Password line must be at least 10 characters long"],
        maxlength: [255, "Password can only be 255 characters long"]
    }
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(val => this._confirmPassword = val)

UserSchema.pre('validate', function(next) {
    console.log(this.password)
    console.log(this.get('confirmPassword'))

    if (this.password !== this.get('confirmPassword')) {
        this.invalidate('confirmPassword', 'Password must match to confirm password')
    }
    next()
})

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})

module.exports = mongoose.model('User', UserSchema)