const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const Category = require('./ModelCategory')
const User = require('./User')

const postSchema = mongoose.Schema({
    post_language: {
        type: String,
        required: [true, "Kategori dili zorunludur"]
    },
    post_title: {
        type: String,
        required: true
    },
    post_description: {
        type: String,
        required: true
    },
    post_category: Category.categorySchema,
    post_visibility: {
        type: Boolean,
        required: true,
        default: true
    },
    post_read_count: {
        type: Number,
        required: true,
        default: 0
    },
    post_image: {
        type: Object,
        required: false
    },
    post_sort_number: {
        type: Number,
        required: true
    },
    post_created_at: {
        type: Date,
        default: Date.now()
    },
    post_author: User.userSchema
})

postSchema.plugin(aggregatePaginate);


module.exports.postSchema = postSchema
module.exports.postModel = mongoose.model('Post', postSchema)