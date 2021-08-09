const { MongoClient } = require('mongodb')
const uri =
  'mongodb+srv://chat-zaions-aoneahsan-haha:chat-zaions-aoneahsan-hehe@cluster0.ndvjs.mongodb.net/chat-zaions?retryWrites=true'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
client.connect(err => {
  const collection = client.db('test').collection('devices')

  console.log({ collection })
  // perform actions on the collection object
  //   client.close();
})
