import { Schema, model } from "mongoose";

const friendSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  friend_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "blocked"],
    default: "pending"
  }
}, { timestamps: true });

const Friend = model("friends", friendSchema);
export default Friend;