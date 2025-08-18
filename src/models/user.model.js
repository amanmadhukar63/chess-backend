import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
    default: 'Guest'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password_hash: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  avtar_url: {
    type: String,
    required: false,
    default: null
  },
  country: {
    type: String,
    required: false,
    default: 'India'
  },
  rating: {
    type: Number,
    required: false,
    default: 1200
  }
}, { timestamps: true});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (this.isModified('password_hash')){
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (password){
  return await bcrypt.compare(password, this.password_hash);
}

const User = model('users', userSchema);
export default User;