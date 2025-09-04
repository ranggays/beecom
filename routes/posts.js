import express from 'express';
import { getPosts, getPost, updatePost, deletePost, addPost } from '../controllers/postController.js';
//import { error } from '../middleware/error.js';
//import { logger } from '../middleware/logger.js';

const router = express.Router();



//all posts
router.get('/', getPosts)

//get post by id
router.get('/:id', getPost)

//add post (POST)
router.post('/', addPost)

//update post
router.put('/:id', updatePost)

router.delete('/:id', deletePost)

router.post('/', (req, res) => {
    res.send('This api products');
})

export default router;

