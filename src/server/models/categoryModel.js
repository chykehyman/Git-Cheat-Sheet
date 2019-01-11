import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },
  cheats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'cheat'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('category', categorySchema);
