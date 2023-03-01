import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

// This will run before all the test starts
let mongo:any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf'

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// This will run before each test
beforeEach(async() => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections){
    await collection.deleteMany({})
  }
})


// This will run after all the tests end
afterAll(async ()=> {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
})
