import React, { useState } from 'react'


const FormFilterPost = (props) => {

    const [state, setState] = useState({
        post_title: ''

    })

    const resetState = () => {
        setState({
            post_title: ''
        })
    }

    const handleChange = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }


    const handleSubmit = (e) => {
        e.preventDefault()

        props.onSubmit(props.pagination_info.page, state)
    }


    return (
        <form className="form-inline" onSubmit={handleSubmit}>
            <div className="form-group my-3">
                <label for="post_title">Başlığı</label>
                <input className="form-control-sm ml-2" onChange={handleChange} value={state.post_title} name="post_title" id="post_title" placeholder="Yazı başlığı giriniz" />
            </div>
            <div className="form-group ml-3">
                <button type="submit" className="btn_1 gray approve"><i className="fas fa-search"></i> Ara</button>
            </div>
        </form>
    )
}

export default FormFilterPost