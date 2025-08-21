import { Schema, model } from "mongoose";

const roomSchema = new Schema ({
  room_code: {
    type: String,
    required: true
  },
  host_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  opponent_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: false,
    default: null
  },
  match_id: {
    type: Schema.Types.ObjectId,
    ref: 'matches',
    required: false,
    default: null
  },
  status: {
    type: String,
    enum: ['waiting','in_progress','finished'],
    required: true
  }
}, { timestamps: true});

const Room = model('rooms', roomSchema);
export default Room;