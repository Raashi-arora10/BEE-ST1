const express = require("express")
const router = express.Router();
const bookController = require("../controllers/controllers")
const Post = require("../model/post");
const Comment =require("../model/comment")

router.get("/", bookController.getAllPosts)
router.get("/:id", bookController.getById)
router.post("/", bookController.addPost)
router.put("/:id", bookController.updatePost)
router.delete("/:id", bookController.deletePost)
router.post("/post/:postId/comment", bookController.addCommentToPost)
router.get('/post/:postId/comment', bookController.getComments)
router.put('/post/:postId/comment', bookController.updateComments)
router.delete('/post/:postId/comment',bookController.deleteComments)

module.exports = router