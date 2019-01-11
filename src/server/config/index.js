import mongoose from 'mongoose';
import config from './dbConfig';
import seedDb from '../seeder/seedController';

export default env => {
  mongoose.Promise = global.Promise;

  const dbconfig = config[env];
  const dbOptions = { useNewUrlParser: true, useCreateIndex: true };

  const connectMongodb = (url, options) => {
    mongoose.connect(
      url,
      options
    );
  };

  if (dbconfig.use_prod_env) {
    connectMongodb(process.env[dbconfig.use_prod_env], dbOptions);
  } else {
    const { prefix, host, port, database } = dbconfig;
    const url = `${prefix}://${host}:${port}/${database}`;

    connectMongodb(url, dbOptions);
  }

  const db = mongoose.connection;
  db.once('open', () => {
    console.info({ message: 'Connected to the database' });
    seedDb();
  });

  db.on('error', () => console.error({ message: 'MongoDB connection error:' }));
};
