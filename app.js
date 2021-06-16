const express = require("express");
const _ = require("lodash");

const app=express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));



//Main Code


let contents=[]

//____Home path____

app.get("/", (req, res) => {
  
  res.render("home",{content:contents});
});


let alert12="no";

//____New Post direct path____
app.get("/compose",(req,res)=>{
  res.render("compose",{alert1:alert12});
});




//____New Post path of post request____
app.post("/",(req,res)=>{

  //If content is present
  if ((req.body.blog_title).length>=1 && (req.body.blog_text).length>=5){
  
  const post={
  title:(req.body.blog_title),
  body:(req.body.blog_text)
  }
  contents.push(post);
  res.redirect("/posts/"+(req.body.blog_title));
}else{
  alert12="yes";
  res.redirect("/compose");
}
});




let hey=[];
  
app.get("/posts/:posName",(req,res)=>{
  let rt=false;
  const requestedTtile= _.lowerCase(req.params.posName);

  for(let i=0;i<contents.length;i++){
    post=contents[i];
    const storedTitle= _.lowerCase(post.title);
    
    if (storedTitle===requestedTtile){
      
      hey.push(post);
      res.redirect("/posts");
      rt= true;
      break;
    }
    
    
  }

  if (rt===false){
    res.redirect("/error");
  }

});



app.get("/posts",(req,res)=>{
  let num=hey.length-1
  res.render("posts",{data:hey[num]});
})




app.get("/error",(req,res)=>{
res.render("nopost");
})


//____Contact path____
app.get("/contact",(req,res)=>{
  res.render("contact");
});



//____About path____
app.get("/about",(req,res)=>{
  res.render("about");
});


//Additional server
app.get("/posts",(req,res)=>{
res.redirect("/");
});

app.get("/download",(req,res)=>{
  res.sendFile(__dirname+"/4th sem result.pdf");
  res.send
})





//____Admin panel____

app.get("/admin",(req,res)=>{
  res.render("admin");
})

app.post("/auth",(req,res)=>{
  if(req.body.pass==="123456789"){
    //admin login
    res.redirect("jhbweukjgwbd1635byg165fv2yvc2gvdvdv76g2v3562");
  }
  else{
    res.redirect("/");
  }
})


//__admin home page with additional features
app.get("/jhbweukjgwbd1635byg165fv2yvc2gvdvdv76g2v3562",(req,res)=>{
  res.render("jhbweukjgwbd1635byg165fv2yvc2gvdvdv76g2v3562",{content:contents});
})




//delete feature
app.get("/hjekybcbcjymaecbejygf576%20735865326v2xgbcb7ddh7268dn8/:ind",(req,res)=>{
  
  try{
  let ind=req.params.ind;
  
  let z=contents.splice(ind,1);
  console.log("Deleted "+contents[i].title+" post")
  }
  
  catch(err){
    console.log("got error while trying to delete a empty post");
  }
  finally{
    res.redirect("/jhbweukjgwbd1635byg165fv2yvc2gvdvdv76g2v3562");
  }
  })



app.listen(process.env.PORT || 3000, () => {
  console.log("Server started at port 3000");
});

