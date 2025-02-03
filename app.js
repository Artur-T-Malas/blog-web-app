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
var userPosts = [{
    author: "Artur",
    content: "Batch File Renamer is a great tool to quickly rename a lot of files with a common name!"
}];
var editPost = false;
var editPostId = 0;

app.use(express.urlencoded( { extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render(
        "index.ejs",
        {
            blogPosts: userPosts,
        }
    );
});

app.post("/posts", (req, res) => {
    userPosts.push({
        author: req.body.author,
        content: req.body.content
    });
    res.redirect("/");
});

// Workarounds below for not being able to use PUT or DELETE method yet
app.post("/posts/edit", (req, res) => {
    editPost = true;
    editPostId = Number(req.body['postId']);
    res.render(
        "index.ejs",
        {
            blogPosts: userPosts,
            editPost: editPost,
            editPostId: editPostId
        }
    );
});

app.post("/posts/update", (req, res) => {
    userPosts[Number(req.body['postId'])] = {
        author: req.body.author,
        content: req.body.content
    };
    editPost = false;
    res.redirect("/");
});

app.post("/posts/update/cancel", (req, res) => {
    editPost = false;
    editPostId = null;
    res.redirect("/");
});

app.post("/posts/delete", (req, res) => {
    let postIdToDelete = Number(req.body['postId']);
    userPosts.splice(postIdToDelete, 1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
