import express from "express";
import bodyParser from "body-parser";

//Initializing express
const app = express();

//Declaring port
const port = 3000;

var entries = [];
class Entry {
    constructor(entryTitle, entryBody, entryDate){
    this.entryTitle = entryTitle,
    this.entryBody = entryBody,
    this.entryDate = entryDate
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
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    let day = String(currentDate.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;

    var entryTitle = req.body["pTitle"];
    var entryBody = req.body["pBody"];
    var entryDate = formattedDate;
    const newEntry = new Entry(entryTitle, entryBody, entryDate);
    entries.push(newEntry);
    res.redirect("/");
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

app.get("/view/:id", (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < entries.length) {
        const post = entries[id];
        res.render("view_post.ejs", { post: post, postIndex: id });
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