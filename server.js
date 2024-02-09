const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const port = process.env.PORT;
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB)
.then(con=>{

 
  console.log("Connected to DATABASE")
}).catch((err) => {
  console.error('erroras',err);
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

