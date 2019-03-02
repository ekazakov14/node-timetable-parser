import mongoose from 'mongoose';
import database from '../database.mjs';

export default function(groups) {
  database()
    .then(db => {

      let allPairs = [];

      const pairSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        faculty: String,
        group: String,
        name: String,
        type: String,
        weeks: Array,
        teacher: String,
        room: String
      });

      const Pair = mongoose.model('Group', pairSchema);

      groups.forEach(group => {
        group.pairs.forEach(pair => {
          const pairRow = new Pair({
            _id: new mongoose.Types.ObjectId(),
            faculty: group.faculty,
            group: group.group,
            name: pair.name,
            type: pair.types,
            weeks: pair.weeks,
            teacher: pair.teacher,
            room: pair.room
          });
          allPairs = [...allPairs, pairRow];
        });
      });

      Pair.create(allPairs)
        .then(() => {
          db.disconnect();
        })
        .catch(e => {
          throw new Error(e);
        });
    })
    .catch(e => {
      throw new Error(e);
    });
}
