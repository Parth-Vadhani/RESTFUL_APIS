const express =require('express');
const app=express();
const port=8080;
const path=require('path');
const {v4:uuid}=require('uuid');
const methodOverride=require('method-override');
app.listen(port,()=>{
       console.log(`Server is running on port ${port}`);
})

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[{
       id:uuid(),
       email : "shradhakhapra@gmail.com",
       content :"Founder of Apna College",
       },
       {
       id:uuid(),
       email : "parthb2105@gmail.com",
       content :"Just trying to learn index routing ",
       },
       {
       id:uuid(),
       email : "chaitalivadhani7@gmail.com",
       content :"Cooking something new ",
       },
       {
       id:uuid(),
       email : "vadhaniabhi@gmail.com",
       content :"Currently in R2 "
       },
       {
       id:uuid(),
       email : "vadhanibharat@gmail.com",
       content :"Founder of Parth NX "
       },
       
]
app.get("/posts",(req,res)=>{
       res.render("./index.ejs",{posts:posts});
})

app.get("/posts/new",(req,res)=>{
       res.render("form.ejs");
       
})

app.post("/posts",(req,res)=>{
       let {username , content }=req.body;
       let id=uuid();
       console.log(req.body);
       console.log(content);
       console.log(username);
       posts.push({id:id,email:username,content:content});
       res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
       let {id}=req.params;
       let reqpost=posts.find((post)=>id===post.id);
       res.render("show.ejs",{post:reqpost});
})

app.patch("/posts/:id",(req,res)=>{
       let {id}=req.params;
       console.log(id);

       let newcontent=req.body.newcon;
       console.log(newcontent);

       res.redirect("/posts")

       let post=posts.find(post=>post.id===id);
       post.content=newcontent;
       console.log(post);
})

app.get("/posts/:id/edit",(req,res)=>{
       let {id}=req.params;
       let post=posts.find(post=>post.id===id);
       console.log(post);
       res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
       let {id}=req.params;
       console.log(id);
       posts=posts.filter(post=>post.id!==id);
       res.redirect("/posts");
})