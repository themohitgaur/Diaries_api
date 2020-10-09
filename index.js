const express =require('express');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');


const userRoutes = require('./src/routes/user.routes');
const diaryRoutes = require('./src/routes/diary.routes');


const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/users',userRoutes);
app.use('/api/diary',diaryRoutes);



var dburl = "mongodb://127.0.0.1:27017/diarydb";

mongoose
  .connect(dburl,{ useUnifiedTopology: true, 

      useNewUrlParser:true, useCreateIndex: true,  useFindAndModify: false })
  .then(() => {
    console.log("Server has started.......")
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });

