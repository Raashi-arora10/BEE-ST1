const Post = require("../model/post")
const Comment = require("../model/comment")

const getAllPosts = async(req,res,next) => {
    let posts;
    try{
        posts = await Post.find();
    }
    catch(err){
        console.log(err)
    }

    if(!posts){
        return res.status(404).json({message:"No post found"})
    }
    return res.status(200).json({ posts })
}
const getById = async (req,res,next) => {
    const id = req.params.id;
    let post;
    try{
        post = await Post.findById(id);
    }
    catch(err){
        console.log(err)
    }
    if(!post){
        return res.status(404).json({message:"No Post found"})
    }
    return res.status(200).json({ post })
}

const addPost = async(req, res, next) => {
    const { title, content, author, tags, comments } = req.body;
    let post;
    try{
        post = new Post({
            title,
            content,
            author, 
            tags,
            comments
        })
        await post.save();   //a method in mongoose to save the data in database
    }
    catch(err){
        console.log(err)
    }
    if(!post){
        return res.status(500).json({message:"Failed to add"})
    }
    return res.status(201).json({ post })
}

const updatePost = async(req,res,next) => {
    const id = req.params.id;
    const { title, content, author, tags, comments } = req.body;
    let post;
    try{
        post = await Post.findByIdAndUpdate(id, {
            title,
            content,
            author, 
            tags,
            comments
        });
        post = await post.save()
    }
    catch(err){
        console.log(err)
    }
    if(!post){
        return res.status(404).json({message:"Unable to update"})
    }
    return res.status(200).json({ post })
}

const deletePost = async (req,res,next) => {
    const id = req.params.id;
    let post;
    try{
        post = await Post.findByIdAndDelete(id);
    }
    catch(err){
        console.log(err)
    }
    if(!post){
        return res.status(404).json({message:"Failed to delete"})
    }
    return res.status(200).json({ message:"Successfully deleted" })
}

const addCommentToPost = async (req, res) => {
    const postId = req.params.postId;
    const { text } = req.body;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      const comment = new Comment({ text });
      post.comments.push(comment);
      await post.save();
  
      res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getComments = async (req, res) => {
    const postId = req.params.postId;

    try {
        const comments = await Comment.find({ postId: postId });

        if (!comments || comments.length === 0) {
            return res.status(404).json({ error: 'Comments not found for the post' });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const updateComments = async (req, res) => {
    const postId = req.params.postId;
    const updateData = req.body; 

    try {
        const result = await Comment.updateMany({ postId: postId }, updateData);

        if (result.nModified > 0) {
            res.status(200).json({ message: 'Comments updated successfully' });
        } else {
            res.status(404).json({ error: 'No comments found for the post' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteComments =  async (req, res) => {
    const postId = req.params.postId;

    try {
        const result = await Comment.deleteMany({ postId: postId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'No comments found for the post' });
        }

        res.status(200).json({ message: 'All comments deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getAllPosts = getAllPosts;
exports.addPost = addPost;
exports.getById = getById;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.addCommentToPost = addCommentToPost;
exports.getComments = getComments;
exports.updateComments = updateComments;
exports.deleteComments = deleteComments;
