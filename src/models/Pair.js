import mongoose from 'mongoose';

const pairSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  faculty: String,
  group: String,
  name: String,
  type: String,
  day: String,
  time: String,
  weeks: Array,
  teacher: String,
  room: String
});

const Pair = mongoose.model('Pairs', pairSchema, 'pairs');

export default Pair;
