import database from './database.js';
import express from 'express';
import Pair from './src/models/Pair.js';

const app = express();

database().then(() => {
  app.get('/search/:string', (req, res) => {
    const query = new RegExp(req.params.string, "i");
    Pair.find({ teacher: query }).exec((error, result) => {
      if (error) throw error;
      res.send(result);
    });
  });
  app.listen(3000);
});
