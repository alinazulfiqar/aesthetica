const router = require("express").Router();
const pool = require("../db");

module.exports = router;

// upvote/downvote post

router.post("/votes", async (req, res) => {
  try {
    const { user_id, content_id, value } = req.body;

    const checkVote = await pool.query(
      "SELECT * FROM votes WHERE u_id=$1 AND c_id=$2",
      [user_id, content_id]
    );

    // undo a vote
    const checkundo = await pool.query(
      "SELECT * FROM votes WHERE u_id=$1 AND c_id=$2 AND values=$3",
      [user_id, content_id, value]
    );
    if (checkundo.rows.length == !0) {
      const deleteVote = await pool.query(
        "DELETE FROM votes WHERE u_id=$1 AND c_id=$2 AND values=$3",
        [user_id, content_id, value]
      );
      return res.json("deleted");
    }

    if (checkVote.rows.length == !0) {
      const updateVote = await pool.query(
        "UPDATE votes SET values = $1 WHERE u_id=$2 AND c_id=$3 RETURNING *",
        [value, user_id, content_id]
      );
      return res.json(updateVote.rows[0]);
    } else {
      const newVote = await pool.query(
        "INSERT INTO votes (u_id, c_id, values) VALUES($1, $2, $3) RETURNING *",
        [user_id, content_id, value]
      );
      return res.json(newVote.rows[0]);
    }
  } catch (err) {
    console.error(err);
  }
});

// return all votes
router.get("/votestable", async (req, res) => {
  try {
    const votes = await pool.query("SELECT * FROM votes");
    console.log(votes.rows);
    return res.json(votes.rows);
  } catch (err) {
    console.error(err);
  }
});
// count total votes

router.post("/allvotes", async (req, res) => {
  try {
    const { c_id } = req.body;
    // const upvotes = await pool.query(
    //   "SELECT COUNT(*) FROM votes WHERE c_id = $1 AND values ='upvote'",
    //   [c_id]
    // );

    // const downvotes = await pool.query(
    //   "SELECT COUNT(*) FROM votes WHERE c_id = $1 AND values ='downvote'",
    //   [c_id]
    // );

    const votes = await pool.query(
      "SELECT (SELECT COUNT(*) FROM votes WHERE c_id =$1 AND values = 'upvote') - (SELECT COUNT(*) FROM votes WHERE c_id =$1 AND values = 'downvote')",
      [c_id]
    );
    for (const [key, value] of Object.entries(votes.rows[0])) {
      console.log(value);
      return res.json(+value);
    }
  } catch (err) {
    console.error(err);
  }
});
// get all current user votes
router.post("/uservotes", async (req, res) => {
  try {
    const { user_id } = req.body;

    const currentUserVotes = await pool.query(
      "SELECT * FROM votes WHERE u_id=$1",
      [user_id]
    );
   return res.json(currentUserVotes.rows)
  } catch (err) {
    console.error(err);
  }
});