import config from './config.js';
import mongoose from 'mongoose';

export default () => (
  new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);

    mongoose.connection
    .on('error', error => reject(error))
    .on('close', () => console.log('Database connection closed'))
    .once('open', () => resolve(mongoose.connection));

    mongoose.connect(config.MONGO_URL);
  })
);