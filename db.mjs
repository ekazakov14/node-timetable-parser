import database from './database.mjs';
import express from 'express';
import Pair from './src/models/Pair.mjs';

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
