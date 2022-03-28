const router = require("express").Router();
const pool = require("../db");

module.exports = router;

// post comments
router.post("/post", async (req, res) => {
  try {
    const { user_id, content_id, date, comment, votes } = req.body;
    const { parent_comment_id } = req.body;
    const fetchuser = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [user_id]
    )
    const userName = fetchuser.rows[0].user_name;

    if (parent_comment_id) {
      const makeReply = await pool.query(
        "INSERT INTO comments (u_id, user_name, c_id, votes, comment_text, parent_comment_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [user_id, userName, content_id, votes, comment, parent_comment_id]
      );

      // // update w/ child id
      //     const updateParent = await pool.query(
      //
      //     )
     
      return res.json(makeReply.rows[0]);
    }
    // deal with parent/child comments later - 2/14

    const makeComment = await pool.query(
      "INSERT INTO comments (u_id, user_name, c_id, votes, comment_text) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, userName, content_id, votes, comment]
    );
    
    return res.json(makeComment.rows[0]);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

// get all comments for post
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allComments = await pool.query(
      "SELECT * FROM comments WHERE c_id=$1",
      [id]
    );
    res.json(allComments.rows);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

// update comments
router.put("/update", async(req,res)=>{
  const {updated_comment, comment_id} = req.body;

  try {
    const updateComment = await pool.query(
      "UPDATE comments SET comment_text = $1 WHERE comment_id =$2 returning *", [
        updated_comment, comment_id
      ]
    )
    return res.json(updateComment.rows[0])

  } catch (err) {
    console.error(err.message)
  }
})

// delete comment

router.delete("/delete", async(req,res)=> {
  const {comment_id} = req.body;

  try {
    const deleteComment = await pool.query(
      "DELETE FROM comments WHERE comment_id = $1", [
        comment_id
      ]
    )
    return res.json("Deleted successfully.")
  } catch (err) {
    console.error(err.message)
  }
})