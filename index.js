const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;


// process.env.PORT
// process.env.NODE_ENV => production or undefined


// middleware

app.use(cors());
app.use(express.json());



// if(process.env.NODE_ENV === "production"){
app.use(express.static(path.join(__dirname, "client/build")));

console.log(path.join(__dirname, "client/build"));
// **routes**
// post to db
app.use("/post", require("./routes/posts"))
// scraper
app.use("/scrape", require("./scraper"))

// register and login routes

app.use("/auth", require("./routes/jwtAuth"));

// upvote/downvote

app.use("/vote", require("./routes/votes"));

// comments
app.use("/comments", require("./routes/comments"));

// get all content
app.get("/content", async (req, res) => {
  try {
    const allContent = await pool.query("SELECT * FROM content");
    res.json(allContent.rows);
  } catch (err) {
    console.error(err);
  }
});

// get mylist
app.post("/my-list", async (req, res) => {
  try {
    const { currentUser } = req.body;
    const myList = await pool.query("SELECT * FROM list WHERE u_id = $1", [
      currentUser,
    ]);
    const id = [];
    myList.rows.map((item, index) => {
      id.push(item.c_id);
    });
    // const contentID = myList.rows[1].c_id;

    const myContent = await pool.query(
      "SELECT * FROM content WHERE id = ANY($1::int[])",
      [id]
    );

    // console.log(myContent.rows);
    if (myList.rows.length !== 0) {
      return res.json(myContent.rows);
    } else {
     return res.status(404).send("No list found. Add something to get started!");
    }
  } catch (err) {
    console.error(err);
  }
});

// add to mylist
app.post("/my-list/add", async (req, res) => {
  try {
    const { currentUser, contentID } = req.body;
    const checkItem = await pool.query(
      "SELECT * FROM list WHERE u_id= $1 AND c_id =$2",
      [currentUser, contentID]
    );
    if (checkItem.rows.length !== 0) {
     return res.json("Already in your list.");
    } else {
      const newItem = await pool.query(
        "INSERT INTO list (u_id, c_id) VALUES ($1, $2) RETURNING *",
        [currentUser, contentID]
      );
     return res.json(newItem.rows[0]);
    }
  } catch (err) {
    res.status(500).send("server error");
    console.error(err);
  }
});

// remove from mylist
app.delete("/my-list/remove", async (req,res)=> {
  const {currentUser, contentID} = req.body
  try {
    const removeItem = await pool.query(
      "DELETE FROM list WHERE u_id = $1 AND c_id = $2",
      [currentUser, contentID]
    )
   return res.json("Deleted!")
  } catch (err) {
    res.status(500).send("server error")
    console.error(err)
  }
})
// get all movies/shows
app.get("/watch", async (req, res) => {
  try {
    const allWatch = await pool.query("SELECT * FROM watch");
    res.json(allWatch.rows);
  } catch (err) {
    console.error(err);
  }
});

// get a specific movie
app.get("/watch/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const watch = await pool.query(
      "SELECT * FROM content WHERE id = $1 AND medium ='watch' ",
      [id]
    );
    res.json(watch.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// create a movie

// update a movie

// get all books
app.get("/read", async (req, res) => {
  try {
    const allRead = await pool.query("SELECT * FROM read");
    res.json(allRead.rows);
  } catch (err) {
    console.error(err);
  }
});

// get a specific book
app.get("/read/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const read = await pool.query(
      "SELECT * FROM content WHERE id = $1 AND medium='read'",
      [id]
    );
    res.json(read.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// create a book

// update a book

// get all games
app.get("/play", async (req, res) => {
  try {
    const allPlay = await pool.query("SELECT * FROM play");
    res.json(allPlay.rows);
  } catch (err) {
    console.error(err);
  }
});

// create a game

// update a game

// get a specific game
app.get("/play/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const play = await pool.query(
      "SELECT * FROM content WHERE id = $1 AND medium='play'",
      [id]
    );
    res.json(play.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// *************by type**************

// get all steampunk
app.get("/steampunk", async (req, res) => {
  try {
    const allSteampunk = await pool.query(
      "SELECT * FROM content WHERE type='steampunk'"
    );
    res.json(allSteampunk.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// get all cyberpunk
app.get("/cyberpunk", async (req, res) => {
  try {
    const allCyberpunk = await pool.query(
      "SELECT * FROM content WHERE type='cyberpunk'"
    );
    res.json(allCyberpunk.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// get all cottagecore
app.get("/cottagecore", async (req, res) => {
  try {
    const allCottagecore = await pool.query(
      "SELECT * FROM content WHERE type='cottagecore'"
    );
    res.json(allCottagecore.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// get all DA
app.get("/dark-academia", async (req, res) => {
  try {
    const allDarkAcademia = await pool.query(
      "SELECT * FROM content WHERE type='dark-academia'"
    );
    res.json(allDarkAcademia.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all medieval
app.get("/medieval", async (req, res) => {
  try {
    const allMedieval = await pool.query(
      "SELECT * FROM content WHERE type='medieval'"
    );
    res.json(allMedieval.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// get all victorian
app.get("/victorian", async (req, res) => {
  try {
    const allVictorian = await pool.query(
      "SELECT * FROM content WHERE type='victorian'"
    );
    res.json(allVictorian.rows);
  } catch (err) {
    console.error(err.message);
  }
});


app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname+ "client/build", "index.html"))
})
// listen

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT} ook!`);
});

// JWT video 1:24
