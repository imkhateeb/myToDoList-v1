const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");


var items = [];
var workItems = [];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", (req, res)=>{
    let toDay = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = toDay.toLocaleDateString("en-IN", options);
    res.render("list", {
        pageTitle: day,
        addNewItems: items
    });
})


// get request for the /work route
app.get("/work", (req, res)=>{
    res.render("list", {
        pageTitle: "Work Items",
        addNewItems: workItems
    })
})


// get request for the /about route
app.get("/about", (req, res)=>{
    res.render("about");
})


app.post("/", (req, res)=>{
    let whatToDo = req.body.newToDo;
    let whatTitle = req.body.whatTitle;
    // console.log(whatTitle)
    whatToDo = whatToDo.toLowerCase();

   
    // If post is made on /work route
    if ( whatTitle === "Work" ){
        let flag = 1;
        for ( let i = 0; i < workItems.length; i++ ){
            if ( whatToDo == workItems[i] ){
                flag = 0;
            }
        }

        if ( flag ){
            workItems.push(whatToDo);
        }
        else{   
            workItems.push("REPEATED");
        }
        res.redirect("/work");


    }else{// if post is made on home route
        let flag = 1;
        for ( let i = 0; i < items.length; i++ ){
            if ( whatToDo == items[i] ){
                flag = 0;
            }
        }

        if ( flag ){
            items.push(whatToDo);
        }
        else{
            items.push("REPEATED");
        }
        res.redirect("/");
    }
})



app.listen(3000, ()=>{
    console.log("App is listening at post 3000");
})