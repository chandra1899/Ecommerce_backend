require('dotenv').config();
const express = require('express');
const cookieParser=require('cookie-parser');
const app = express();
const db = require('./config/mongoose');
const PORT=8000;
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors=require("cors");
// app.use(
//     cors({
//       origin: true,
//       credentials: true,
//     })
//   );

app.use(cors({ 
  origin: ["http://localhost:5173", "https://ecommerce-u145.onrender.com/","http://localhost:8000"],
  credentials: true,
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('dist'));
// app.use('/photo',express.static(path.join(__dirname,'..')));

app.use(session({
  name:process.env.SESSION_NAME,
  secret:process.env.SESSION_SECRET,
  saveUninitialized:false,
  resave:false,
  cookie:{
      maxAge:(1000*60*100)
  },
  store: MongoStore.create(
      { 
          mongoUrl: process.env.MONGOOSE_URL
       },function(err){
        console.log(err);
       }
       )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes')); 

app.listen(PORT,(err)=>{
    if(err) console.log("error in running server",err);
    console.log(`Server is successfully running on port: ${PORT}`); 
})