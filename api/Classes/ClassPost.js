const PostModel = require('../Models/ModelPost')


class Post {
    constructor(
        post_language,
        post_title,
        post_description,
        post_category,
        post_visibility,
        post_read_count,
        post_image,
        post_sort_number
    ) {
        this.post_id = ''
        this.post_language = post_language
        this.post_title = post_title
        this.post_description = post_description
        this.post_category = post_category
        this.post_visibility = post_visibility
        this.post_read_count = post_read_count
        this.post_image = post_image
        this.post_sort_number = post_sort_number

    }

    setPostId(post_id) {
        this.post_id = post_id
    }


    async save(cb) {
        const savedPost = new PostModel.postModel(this)

        await savedPost.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedPost,
                    status: 400
                })
            }
        })
    }


    async update(cb) {

        if (this.post_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await PostModel.postModel.findByIdAndUpdate(
            { _id: this.post_id },
            this

            , (err, updatedPost) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedPost
                    })
                }
            })
    }


    async delete(cb) {
        await PostModel.postModel.deleteOne({ _id: this.post_id }, (err) => {
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

module.exports = Post