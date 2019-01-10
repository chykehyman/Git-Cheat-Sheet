import { Schema, model } from 'mongoose';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'Username is required'],
    minlength: [3, 'Username length is too short'],
    maxlength: [25, 'Username length is too long']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password strength is not strong']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.generateHash = password => hashSync(password, genSaltSync(8));

UserSchema.methods.validatePassword = (password, dbPassword) => compareSync(password, dbPassword);

export default model('user', UserSchema);
