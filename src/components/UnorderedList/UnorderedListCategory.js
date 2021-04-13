import React, { useState, useEffect } from 'react'
import Pagination from '../Pagination/Pagination'
import api from '../../services/api'
import ListCategory from '../List/ListCategory'
import FormFilterCategory from '../Form/FormFilterCategory'
import Swal from 'sweetalert2'

const UnorderedListCategory = () => {


    const [state, setState] = useState({
        categories: [],
        pagination_info: [],
        is_categories_loaded: ''
    })



    useEffect(() => {
        getCategories()
    }, [])


    const getCategories = async (page = 1, filters = {}) => {
        setState({
            ...state,
            is_categories_loaded: false
        })


        const categories = await api.get('/categories/' + page, { params: filters })
        console.log(categories);
        setState({
            ...state,
            categories: categories.data.docs,
            pagination_info: categories.data,
            is_categories_loaded: true
        })

    }


    const handleDeleteClick = async (e) => {

        const submitResponse = await api.delete('/categories/' + e.currentTarget.dataset.id)

        if (submitResponse.data.status != 400) {
            Swal.fire({
                title: 'Silindi',
                icon: 'success'
            })
            getCategories()
        } else {
            Swal.fire({
                title: submitResponse.data.responseData,
                icon: 'error'
            })
        }

    }


    let categoriesHtml = ''
    if (state.is_categories_loaded) {
        categoriesHtml = state.categories.map((item) => {
            return (
                <ListCategory onClick={handleDeleteClick} category={item} />
            )
        })
    }


    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <FormFilterCategory onSubmit={getCategories} pagination_info={state.pagination_info} />
                </div>
            </div>
            <ul>
                {categoriesHtml}
            </ul>
            <div className="row">
                <div className="col-lg-12 mt-4">
                    <Pagination object={state.pagination_info} onClick={getCategories} />
                </div>
            </div>
        </>
    )
}

export default UnorderedListCategory