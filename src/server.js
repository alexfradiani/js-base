const { PORT } = require('./config/globals');
const connection = require('./database/connection');
const app = require('./app');

const handleConnection = async () => {
  app.listen(PORT, () => {
    return console.log(`server is listening on ${PORT}`);
  });
};

connection.create(handleConnection);
