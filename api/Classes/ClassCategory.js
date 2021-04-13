const CategoryModel = require('../Models/ModelCategory')


class Category {
    constructor(
        category_language,
        is_category_main,
        category_upper_category,
        category_type,
        category_name,
        category_description,
        category_image,
        category_header_visibility
    ) {
        this.category_id = ''
        this.category_language = category_language
        this.is_category_main = is_category_main
        this.category_upper_category = category_upper_category
        this.category_type = category_type
        this.category_name = category_name
        this.category_description = category_description
        this.category_image = category_image
        this.category_header_visibility = category_header_visibility

    }

    setCategoryId(category_id) {
        this.category_id = category_id
    }


    async save(cb) {
        const savedCategory = new CategoryModel.categoryModel(this)

        await savedCategory.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedCategory,
                    status: 400
                })
            }
        })
    }


    async update(cb) {

        if (this.category_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await CategoryModel.categoryModel.findByIdAndUpdate(
            { _id: this.category_id },
            this

            , (err, updatedCategory) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedCategory
                    })
                }
            })
    }


    async delete(cb) {
        await CategoryModel.categoryModel.deleteOne({ _id: this.category_id }, (err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err,
                    status: 400

                })
            } else {
                cb({
                    response: true,
                    status: 200,
                    responseData: "Başarılı"
                })
            }
        })
    }
}

module.exports = Category