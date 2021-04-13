import React from 'react'
import { Component } from 'react';
import api from '../../services/api';

class SelectCategory extends Component {

    constructor() {
        super()

        this.state = {
            categories: [],
            is_categories_loaded: false,
            params: {}
        }
    }

    async componentDidMount() {
        if (this.props.params) {
            this.setState({
                params: this.props.params
            })
        }

        const categories = await api.get('/categories/1', { headers: { 'site-token': localStorage.getItem('site-token') }, params: this.state.params })

        this.setState({
            categories: categories.data.docs,
            is_categories_loaded: true
        })
    }

    render() {

        let categoriesJsx = ''
        if (this.state.is_categories_loaded) {
            categoriesJsx = this.state.categories.map((item) => {
                return (
                    <option value={item._id}>{item.category_name}</option>
                )
            })
        }

        return (
            <select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
                {categoriesJsx}
            </select>
        )
    }
}

export default SelectCategory