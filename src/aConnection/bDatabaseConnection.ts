import mongoose from "mongoose";


const databaseConnection = () => {
  // MongoDB Atlas Cluster connection made through internsdaemon@gmail.com
  const DB_URL = "mongodb+srv://internsdaemon:tacaTMhd6AVLDH39@inventech.sjgqu.mongodb.net/?retryWrites=true&w=majority&appName=Inventech";

  mongoose.set("strictQuery", true);
  mongoose
    .connect(DB_URL, { dbName: "InventechApplication" })
    // .connect(DB_URL, { dbName: "KisnaApplication" })
    .then(response => {
      console.log(`Great... MongoDB connected on server ${response.connection.host} at ${response.connection.name}`);
    })
  // .catch(error => {
  //   console.log(error);
  // })
}

export default databaseConnection;
