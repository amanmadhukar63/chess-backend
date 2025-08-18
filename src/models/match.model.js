import { Schema, model } from "mongoose";

const matchSchema = new Schema({
  white_player_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  black_player_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  result: {
    type: String,
    enum: ['white_win', 'black_win', 'draw', 'in_progress'],
    default: 'in_progress'
  },
  match_ended_by: {
    type: String,
    enum: ['resignation', 'checkmate', 'stalemate', 'timeout', 'abandoned','draw','in_progress'],
    default: 'in_progress'
  },
  move_list: [
    {
      move_number: {
        type: Number,
        required: true
      },
      notation: {
        type: String,
        required: true
      },
      fen: {
        type: String,
        required: true
      },
      played_by: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      timestamp: {
        type: Date,
        required: true
      }
    }
  ]
}, { timestamps: true});

const Match = model('matches',matchSchema);
export default Match;