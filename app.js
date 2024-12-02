const express =require('express');
const  mysql = require("mysql2");
const doenv =require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieparser=require("cookie-parser")
const app = express();

doenv.config({
    path:'./.env'
});

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE,
});

db.connect ((err) =>{
    if  (err) {
        console.log(err);
    }else{
        console.log("mysql connection success");
    }
});

app.use(cookieparser());
app.use(express.urlencoded({extended:false}));

const location =path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");

const Partialspath = path.join(__dirname,"./views/partials");
hbs.registerPartials(Partialspath);


app.use("/",  require("./router/page"));
app.use("/auth",  require("./router/auth"));



app.listen(5000,() => {
    console.log("server started @ port 5000")
});