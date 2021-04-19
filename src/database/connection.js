const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config/globals');

const connection = {
  async create(callback) {
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    mongoose.connection.on('error', (err) => {
      console.log(`error connecting to DB: ${err}`);
    });
    mongoose.connection.once('open', () => {
      console.log('mongodb connected');
      if (callback) {
        callback();
      }
    });
  },

  async close() {
    await mongoose.disconnect();
  },

  async clear() {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    for (const coll of collections) {
      await db.collection(coll.name).deleteMany({});
    }
  }
};

module.exports = connection;
