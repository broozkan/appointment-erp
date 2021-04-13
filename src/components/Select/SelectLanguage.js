import React from 'react'
import { Component } from 'react';

class SelectLanguage extends Component {
    render() {
        return (
            <select className="form-control" name="category_language" value={this.props.value} onChange={this.props.onChange}>
                <option value="" disabled selected>Dil seçiniz</option>
                <option value="tr">Türkçe</option>
            </select>
        )
    }
}

export default SelectLanguage