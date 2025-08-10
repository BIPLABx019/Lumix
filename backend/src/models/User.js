import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  bio: {
    type: String,
    maxlength: 100,
    default: ""
  },
  profilePic: {
    type: String,
    default: "" 
  },
  friends: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}]

}, { timestamps: true });

userSchema.pre("save",async function(next) {

    if (!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch (err) {
        next(err);
    }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    const isPasswordCorrect = await bcrypt.compare(enteredPassword,this.password);
    return isPasswordCorrect;
}

const User = mongoose.model('User', userSchema);

export default User;