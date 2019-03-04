import mongoose from 'mongoose';
import database from '../database.mjs';
import Pair from './models/Pair.mjs';

export default function(groups) {
  database()
    .then(db => {
      let allPairs = [];

      groups.forEach(group => {
        group.pairs.forEach(pair => {
          const pairRow = new Pair({
            _id: new mongoose.Types.ObjectId(),
            faculty: group.faculty,
            group: group.group,
            name: pair.name,
            type: pair.types,
            day: pair.day,
            time: pair.time,
            weeks: pair.weeks,
            teacher: pair.teacher,
            room: pair.room
          });
          allPairs = [...allPairs, pairRow];
        });
      });

      Pair.create(allPairs)
        .then(() => {
          db.close();
        })
        .catch(e => {
          throw new Error(e);
        });
    })
    .catch(e => {
      throw new Error(e);
    });
}
