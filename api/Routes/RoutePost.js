const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const PostModel = require('../Models/ModelPost')
const Post = require('../Classes/ClassPost')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');


// get post list
router.get('/:page', async (req, res) => {

    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query._id) {
            req.query._id = mongoose.Types.ObjectId(req.query._id)
        }

        if (req.query.post_title) {
            req.query.post_title = { $regex: new RegExp(req.query.post_title, "i") }
        }

        if (req.query["_id"]) {
            req.query["_id"] = mongoose.Types.ObjectId(req.query["_id"])
        }

    }
    const aggregate = PostModel.postModel.aggregate([{
        $match: req.query
    }
    ])

    const options = {
        page: req.params.page,
        limit: 50
    }

    PostModel.postModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific post
router.get('/get/:postId', async (req, res) => {
    PostModel.postModel.findById(req.params.postId, (err, result) => {
        res.send(result)
    })
})

router.post('/', [Controller.verifySiteToken, MultipartyMiddleware], async (req, res) => {


    req.body = JSON.parse(req.body.data)

    if (req.files.file) {
        const tmp_path = req.files.file.path
        const target_path = path.join(uploadDir, req.files.file.name)


        fs.rename(tmp_path, target_path, (err) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: "Dosya yüklenemedi"
                })
                res.end()

                return false
            } else {
                fs.unlink(tmp_path, (err) => {

                })

            }
        })

        req.body.post_image = req.files.file
    }

    const post = new Post(
        req.body.post_language,
        req.body.post_title,
        req.body.post_description,
        req.body.post_category,
        req.body.post_visibility,
        req.body.post_read_count,
        req.body.post_image,
        req.body.post_sort_number
    )


    post.save((result) => {
        res.send(result)
    })

})


router.put('/:postId', [Controller.verifySiteToken, MultipartyMiddleware], async (req, res) => {

    req.body = JSON.parse(req.body.data)

    if (req.files.file) {
        const tmp_path = req.files.file.path
        const target_path = path.join(uploadDir, req.files.file.name)


        fs.rename(tmp_path, target_path, (err) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: "Dosya yüklenemedi"
                })
                res.end()

                return false
            } else {
                fs.unlink(tmp_path, (err) => {

                })

            }
        })

        req.body.post_image = req.files.file
    }


    const post = new Post(
        req.body.post_language,
        req.body.post_title,
        req.body.post_description,
        req.body.post_category,
        req.body.post_visibility,
        req.body.post_read_count,
        req.body.post_image,
        req.body.post_sort_number
    )

    await post.setPostId(req.params.postId)

    await post.update((result) => {
        res.send(result)
    })
})


router.delete('/:postId', async (req, res) => {

    const post = new Post

    await post.setPostId(req.params.postId)

    await post.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
