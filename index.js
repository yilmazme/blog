const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const router = require("./routes/articles");
const methodOver= require("method-override")
require('dotenv').config();



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(methodOver('_method'));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/css")));




mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false,
})

mongoose.connection.on("connected",()=>{
    console.log("db connected")
})
app.use("/", router );
app.get("*", (req,res)=>{
    res.send("<h2>There is no such path</h2>")
})
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`app started at ${port}`)
})