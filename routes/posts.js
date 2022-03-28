const pool = require("../db");
const router = require("express").Router();

module.exports = router

// create a post
router.post('/submit', async(req,res)=> {
    try {
        const {user_id, name, medium, type, genre, description, imageURL, whereToFind} =req.body
        // check if title exists in db
        const alreadyExists = await pool.query("SELECT * FROM content WHERE name =$1 AND medium =$2", [
            name, medium
        ])
        if (alreadyExists.rows.length!==0) {
            return res.json("Content already exists. Consider browsing instead.")
        }else{
        const newPost = await pool.query("INSERT INTO content (name, medium, type, genre, description, imageURL, whereToFind, u_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [name, medium, type, genre, description, imageURL, whereToFind, user_id])
        return res.json(newPost.rows[0])

        }
        
    } catch (err) {
        console.error(err.message)
    }
})

router.post('/allposts', async(req,res)=> {
    try {
        const {user_id} = req.body

        const allPosts = await pool.query("SELECT * FROM content WHERE u_id = $1", [
            user_id
        ])
        return res.json(allPosts.rows)
        
    } catch (err) {
        console.error(err.message)
    }
})

router.delete('/delete', async(req,res)=> {
    try {
        const {id} = req.body
        const deleteFromComments =  await pool.query("DELETE FROM comments WHERE c_id=$1", 
        [id])
        const deleteFromVotes =  await pool.query("DELETE FROM votes WHERE c_id=$1", 
        [id])
        const deleteFromList = await pool.query("DELETE FROM list WHERE c_id=$1", 
        [id])
        const deletePost = await pool.query("DELETE FROM content WHERE id = $1", [
            id
        ])
        return res.json("Successfully deleted!")
    } catch (err) {
        console.error(err.message)
    }
})