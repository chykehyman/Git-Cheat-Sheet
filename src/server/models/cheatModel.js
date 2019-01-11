import { Schema, model } from 'mongoose';

const cheatSchema = new Schema({
  description: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  command: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  keywords: [String],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  }
});

export default model('cheat', cheatSchema);
