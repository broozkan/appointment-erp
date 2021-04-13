const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const categorySchema = mongoose.Schema({
    category_language: {
        type: String,
        required: [true, "Kategori dili zorunludur"]
    },
    is_category_main: {
        type: Boolean,
        required: true
    },
    category_upper_category: this,
    category_type: {
        type: String,
        required: [true, "Kategori tipi zorunludur"],
        enum: [
            "post_category",
            "service_category",
            "product_category",
            "gallery_category"
        ]
    },
    category_name: {
        type: String,
        required: [true, "Kategori adı zorunludur"]
    },
    category_description: {
        type: String,
        required: [true, "Kategori açıklaması zorunludur"]
    },
    category_image: {
        type: Object,
        required: false
    },
    category_header_visibility: {
        type: Boolean,
        required: [true, "Kategori vitrin görünümü zorunludur"]
    }
})

categorySchema.plugin(aggregatePaginate);


module.exports.categorySchema = categorySchema
module.exports.categoryModel = mongoose.model('Category', categorySchema)