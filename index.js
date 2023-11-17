import express from "express";
import bodyParser from "body-parser";

//Initializing express
const app = express();

//Declaring port
const port = 3000;

var entries = [];
class Entry {
    constructor(entryTitle, entryBody){
    this.entryTitle = entryTitle,
    this.entryBody = entryBody
    };
}

//For CSS files
app.use(express.static("public"));

//To use req.body property
app.use(bodyParser.urlencoded({ extended: true }));

//Get request to home page
app.get("/", (req, res) => {
    res.render("index.ejs", {entries: entries});
})

app.get("/create", (req, res) => {
    res.render("create_post.ejs");
})

app.post("/submit", (req, res) => {
    var entryTitle = req.body["pTitle"];
    var entryBody = req.body["pBody"];
    const newEntry = new Entry(entryTitle, entryBody);
    entries.push(newEntry);
    console.log(entries);
    res.redirect("/");
    console.log(entries);
})

app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < entries.length) {
        entries.splice(id, 1);
    }
    res.redirect('/');
});

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < entries.length) {
        const post = entries[id];
        res.render("edit_post.ejs", { post: post, postIndex: id });
    } else {
        res.redirect('/');
    }
});

app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < entries.length) {
        entries[id].entryTitle = req.body.pTitle;
        entries[id].entryBody = req.body.pBody;
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});



console.log(entries);

//Setting up Port 3000
app.listen(port, () => {
    console.log("Server up at Port 3000");
})