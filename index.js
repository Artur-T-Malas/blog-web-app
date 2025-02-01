import express from "express";

const port = 3000;
const app = express();

/*
Example userPost object:
{
    author: "Artur",
    content: "Batch File Renamer is a great tool to quickly rename a lot of files with a common name!"
}
*/
var userPosts = [];

app.use(express.urlencoded( { extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render(
        "index.ejs",
        {
            blogPosts: userPosts
        }
    );
});

app.post("/posts", (req, res) => {
    console.log(req.body);
    userPosts.push({
        author: req.body.author,
        content: req.body.content
    });
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
