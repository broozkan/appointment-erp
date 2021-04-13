const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const CategoryModel = require('../Models/ModelCategory')
const Category = require('../Classes/ClassCategory')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');


// get category list
router.get('/:page', async (req, res) => {

    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query._id) {
            req.query._id = mongoose.Types.ObjectId(req.query._id)
        }

        if (req.query.category_name) {
            req.query.category_name = { $regex: new RegExp(req.query.category_name, "i") }
        }

        if (req.query["_id"]) {
            req.query["_id"] = mongoose.Types.ObjectId(req.query["_id"])
        }

    }
    const aggregate = CategoryModel.categoryModel.aggregate([{
        $match: req.query
    },

    {
        $sort: { category_order_priority_number: 1 }
    }
    ])

    const options = {
        page: req.params.page,
        limit: 50
    }

    CategoryModel.categoryModel.aggregatePaginate(aggregate, options, (err, result) => {

        result.docs.forEach(element => {
            if (element.category_type == "post_category") {
                element.category_type = "Yazı Kategorisi"
            } else if (element.category_type == "service_category") {
                element.category_type = "Hizmet Kategorisi"
            } else if (element.category_type == "product_category") {
                element.category_type = "Ürün Kategorisi"
            } else if (element.category_type == "gallery_category") {
                element.category_type = "Galeri Kategorisi"
            }

        });

        res.send(result)
    })
})


// get specific category
router.get('/get/:categoryId', async (req, res) => {
    CategoryModel.categoryModel.findById(req.params.categoryId, (err, result) => {
        res.send(result)
    })
})

router.post('/', MultipartyMiddleware, async (req, res) => {


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

        req.body.category_image = req.files.file
    }

    const category = new Category(
        req.body.category_language,
        req.body.is_category_main,
        req.body.category_upper_category,
        req.body.category_type,
        req.body.category_name,
        req.body.category_description,
        req.body.category_image,
        req.body.category_header_visibility
    )


    category.save((result) => {
        res.send(result)
    })

})


router.put('/:categoryId', MultipartyMiddleware, async (req, res) => {

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

        req.body.category_image = req.files.file
    }


    const category = new Category(
        req.body.category_language,
        req.body.is_category_main,
        req.body.category_upper_category,
        req.body.category_type,
        req.body.category_name,
        req.body.category_description,
        req.body.category_image,
        req.body.category_header_visibility
    )

    await category.setCategoryId(req.params.categoryId)

    await category.update((result) => {
        res.send(result)
    })
})


router.delete('/:categoryId', async (req, res) => {

    const category = new Category

    await category.setCategoryId(req.params.categoryId)

    await category.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
