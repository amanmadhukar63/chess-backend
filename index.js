import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const port = process.env.PORT || 3000;

connectDB()
.then(() => {
  app.listen(port, () => {
    console.log('🟢 Server is running on port',port);
  })
})
.catch((err) => {
  console.log('🛑 Mongo DB connection failed',err);
});