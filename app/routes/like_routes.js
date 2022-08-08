const express = require('express')
const passport = require('passport')
const Post = require('../models/post')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

//MAKING A ROUTER
const router = express.Router()
// importing post model to access database 


// POST route - add like
router.post('/like/:postId', requireToken, (req, res, next) => {
    const postId = req.params.postId
    req.body.owner = req.user.id // change to token

    Post.findById(postId)
        .then(post => {
            post.likes.push(req.body.owner)
            return post.save()
        })
        .then((post) => {
			res.status(201).json({ post: post.toObject() })
		})
        .catch(next)
})

//DELETE route - remove like
router.delete('/like/:postId', requireToken, (req, res, next) => {
    const postId = req.params.postId
    req.body.owner = req.user.id // change to token

    Post.findById(postId)
        //after we found a post we want to take that post and add the comments
        .then(post => {
            //single post doc there is a field called comments
            post.likes.remove(req.body.owner)
            // post.likes.forEach((item, i) => {
            //     if (item._id == eventId) {
            //         // remove the event out of the array
            //         cal.events.splice(i, 1)
            //         // save the document
            //         cal.save()
            //         res.redirect(`/personal/${calId}`)
            //     }
            // })

            // if we change a doc, we have to return and call .save() on the doc
            return post.save()
        })
        .then((post) => {
			res.status(201).json({ post: post.toObject() })
		})
        .catch(next)
})
module.exports = router