const express = require("express");
const router = express.Router();
require('dotenv').config();



const Story = require("../Story");

var loggedin=false;
var newComment= false;
var commentArray=["0"];

//this func prevent cache-- when user logout can go back authenticated page page
router.use(function(req, res, next) {
      res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      next();
    });
 
router.get("/articles", (req,res)=>{
    
    Story.find({})
    .lean()
    .then((data)=>{
      
        res.render("home",{story:data, loggedin:loggedin, style:"home.css"})
    })
    
})

router.post("/articles/logout",(req,res)=>{
    loggedin=false;
    res.redirect("/articles");
    
})

router.get("/articles/login", (req,res)=>{
    if(!loggedin){
        res.render("login", {style:"../login.css"})
    }
    else{
        res.redirect("back")
        return
    }
})

     function admin(req, res, next) {
      const {username, password}=req.body;
      if (username != process.env.USER_NAME || password != process.env.LOGIN_PASSWORD) {
        return res.status(403).send({error: { status:403, message:'Access denied.'}});
      }
      loggedin=true;
      next();
    }
  
router.post("/articles/login",admin,(req,res)=>{
    res.redirect("/articles/new")
})
function checkLoggedin(req,res,next){
    if(!loggedin){
        return res.status(403).send({error: { status:403, message:'Access denied.'}});
    }
    next()
}

router.get("/articles/new",checkLoggedin ,(req,res)=>{
    res.render("form",{newComment:newComment, idx:commentArray[commentArray.length-1]})
    setTimeout(()=>{
         newComment=false;
        commentArray.pop();
        }, 4000)
})

router.post("/articles/new", (req,res)=>{
const {name,date,description,story, comment, like}=req.body;
const newStory = new Story({
    name:name,
    date: date,
    description:description,
    story: story,
    comments:comment,
    likes: like
})
newStory
.save()
.then((data)=>{
    console.log(data)
})
res.redirect("/articles")
})

router.get("/articles/:id",(req,res)=>{
   Story.findById(req.params.id)
   .lean()
   .then((data)=>{
       res.render("story",{
            story:data,
            loggedin:loggedin,
            style:"../story.css",
            text:"Yorum yap\n \n(anonim yorum yaptığınızda yorumunuzu ancak blogun sahibi silebilir)"
       })
   })
   .catch(() => {
       res.send(`<h2>There is no article with id:${req.params.id}</h2>`)
   });
})

  

router.post("/articles/:id", (req,res)=>{
    let {comment} = req.body;
    let comment1 =comment.toLowerCase().split(" ")
    let test="";
    for(let i=0; i<comment1.length; i++){
        test = test +" "+comment1[i].replace(/[^a-zA-Z0-9,.ışöüğç ]/g, '')
 
      }
        Story.findByIdAndUpdate(req.params.id,{$push:{comments:test}},{new:true},(err, doc)=>{
            if (err) {
                console.log("Something wrong when updating data!");
            }
            res.redirect("back")
            return;
        })
      newComment=true;
      commentArray.push(req.params.id) 
})

//updating likes
router.put("/articles/:id", (req,res)=>{
    const {likes} = req.body;
    Story.findByIdAndUpdate(req.params.id,{$set:{likes: Number(likes)+1}},{new:true},(err, doc)=>{
        if (err) {
            console.log("Something wrong when updating data!");
        }
        res.redirect("back")
    })    
})

module.exports=router;