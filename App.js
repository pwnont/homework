const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

var items = ["Write Report","Study Backend","Eat Lunch"];

app.get("/", (req,res)=>{
   var today = new Date();
   var options = {
       weekday: "long",
       day: "numeric",
       month:"long"
   }
   var day = today.toLocaleDateString("th-TH");

   res.render("list", {kindOfDay: day, newListItems:items});
})

app.post("/", (req,res) => {
   //item = req.body.newItem
   //res.render("list", {newListItem: item})
   items.push(req.body.newItem);
   res.redirect("/")
})

app.post("/remove", (req,res)=>{
    var removeItem = req.body.removeItem;
    if (items.includes(removeItem)) {
        console.log(removeItem)
        items.splice(items.indexOf(removeItem),1)
    }
    res.redirect("/");
})

app.listen(3000, ()=>{
   console.log("Server is running at port 3000");
})