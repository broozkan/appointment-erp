import React, { useState, useEffect } from 'react'
import Pagination from '../Pagination/Pagination'
import api from '../../services/api'
import ListPost from '../List/ListPost'
import FormFilterPost from '../Form/FormFilterPost'
import Swal from 'sweetalert2'

const UnorderedListPost = () => {


    const [state, setState] = useState({
        posts: [],
        pagination_info: [],
        is_posts_loaded: ''
    })



    useEffect(() => {
        getPosts()
    }, [])


    const getPosts = async (page = 1, filters = {}) => {
        setState({
            ...state,
            is_posts_loaded: false
        })


        const posts = await api.get('/posts/' + page, { params: filters })
        console.log(posts);
        setState({
            ...state,
            posts: posts.data.docs,
            pagination_info: posts.data,
            is_posts_loaded: true
        })

    }


    const handleDeleteClick = async (e) => {

        const submitResponse = await api.delete('/posts/' + e.currentTarget.dataset.id)

        if (submitResponse.data.status != 400) {
            Swal.fire({
                title: 'Silindi',
                icon: 'success'
            })
            getPosts()
        } else {
            Swal.fire({
                title: submitResponse.data.responseData,
                icon: 'error'
            })
        }

    }


    let postsHtml = ''
    if (state.is_posts_loaded) {
        postsHtml = state.posts.map((item) => {
            return (
                <ListPost onClick={handleDeleteClick} post={item} />
            )
        })
    }


    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <FormFilterPost onSubmit={getPosts} pagination_info={state.pagination_info} />
                </div>
            </div>
            <ul>
                {postsHtml}
            </ul>
            <div className="row">
                <div className="col-lg-12 mt-4">
                    <Pagination object={state.pagination_info} onClick={getPosts} />
                </div>
            </div>
        </>
    )
}

export default UnorderedListPost