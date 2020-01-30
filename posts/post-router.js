const express = require('express');

// database access using knex
const postDB = require('../data/db-config.js');

const router = express.Router();

// router.get('/', async (req, res) => {
//     const posts = await postDB('posts');
//     console.log(posts);
//     res.sendStatus(200);
// });

//√√
router.get('/', async (req, res) => {
    try {
    const posts = await postDB('posts');
    // SQL select * from posts; 
    res.json(posts);
    // console.log(posts);
    } catch(error) {
    res.sendStatus(500).json({ message: ' failed to get posts.'});
    }
});

//√√
router.get('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const post = await postDB('posts').where('id', id); 
        //SQL  select * from posts where id = 17;
        //returns always an array [ ], even it's one item. 
        // [post] to get one without array.
        res.json(post); 
    } catch (error) {
        res.sendStatus(500).json({ message: ' failed to get posts.'});
    }
});

// √√ 
router.post('/', async (req, res) => {
    const postData = req.body; 
    try {
        const post = await postDB('posts').insert(postData);
        res.status(201).json(post);
    } catch(error) {
        res.sendStatus(500).json({ message: ' failed to get posts.'});
    }
});


// something wrong. 
router.put('/:id', async (req, res) => {
    const {id} = req.params; 
    try {
        const rowsUpdated = await postDB('posts')
        .where('id', id)
        .update(req.body);
        res.status(200).json({updated: rowsUpdated }); 
    } catch(error) {
        res.sendStatus(500).json({ message: ' failed to get posts.'}); 
    }
});


// √√
router.delete('/:id', async (req, res) => { 
    try {
        const rowsDeleted = await postDB('posts').where('id', req.params.id).del();
        res.json({ deletedRecords: 'rowsDeleted '})
    } catch(error) {
        res.sendStatus(500).json({ message: ' failed to get posts.'}); 
    }
});

module.exports = router;