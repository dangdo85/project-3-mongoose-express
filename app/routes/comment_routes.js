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


// POST route - cration
//localhost:3000/posts/comments:postId <- A single Post can have many commnents
router.post('/:postId', requireToken, (req, res, next) => {
    const postId = req.params.postId
    req.body.owner = req.user.id // change to token

    Post.findById(postId)
        //after we found a post we want to take that post and add the comments
        .then(post => {
            //single post doc there is a field called comments
            post.comments.push(req.body)

            // if we change a doc, we have to return and call .save() on the doc
            return post.save()
        })
        .then((post) => {
			res.status(201).json({ post: post.toObject() })
		})
        .catch(next)
})

// DELETE route
//localhost:3000/comments/delete/:post.Id/:commId
router.delete('/delete/:postId/:commId', requireToken, (req, res, next) => {
    const postId = req.params.postId
    const commId = req.params.commId
    // find a post by it's ID
    Post.findById(postId) // single post doc - many comments
    // find this comment by it's ID
        .then(post => {
            console.log('post', post.comments.id)
            const comment = post.comments.id(commId)
            console.log('i am the comment', comment)
            console.log('commid & postId', commId, postId)
            requireOwnership(req, comment)
            // remove the comment
            comment.remove()

            // i've changed the comments field by 1
            return post.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)

})
module.exports = router