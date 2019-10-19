const mongodb = require("mongodb");
const { MONGODB_URL } = require("./config");
const MongoClient = mongodb.MongoClient;

module.exports = (async () => {
  const client = await MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client;
})();
