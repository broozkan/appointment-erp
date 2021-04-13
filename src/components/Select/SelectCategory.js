import React from 'react'
import { Component } from 'react';

class SelectCategoryType extends Component {
    render() {
        return (
            <select className="form-control" name="category_type" value={this.props.value} onChange={this.props.onChange}>
                <option value="" disabled selected>Tip seçiniz</option>
                <option value="post_category">Yazı Kategorisi</option>
                <option value="service_category">Hizmet Kategorisi</option>
                <option value="product_category">Ürün Kategorisi</option>
                <option value="gallery_category">Galeri Kategorisi</option>
            </select>
        )
    }
}

export default SelectCategoryType