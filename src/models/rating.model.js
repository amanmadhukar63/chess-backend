import { Schema, model } from "mongoose";

const ratingSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  match_id: {
    type: Schema.Types.ObjectId,
    ref: 'matches',
    required: true
  },
  old_rating: {
    type: Number,
    required: true
  },
  new_rating: {
    type: Number,
    required: true
  },
  change: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Rating = model("ratings", ratingSchema);
export default Rating;