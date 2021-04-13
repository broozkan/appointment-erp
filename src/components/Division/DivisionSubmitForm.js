import React from 'react'
import { Component } from 'react';

class DivisionSubmitForm extends Component {


    render() {

        let innerJsx = (
            <>
                <i className="fas fa-save"></i> Kaydet
            </>

        )
        if (this.props.isSubmitting) {
            innerJsx = (
                <i className="fas fa-spinner fa-spin"></i>
            )
        }

        return (
            <div className="form-group">
                <p><button type="submit" className="btn_1 medium"> {innerJsx}</button></p>
            </div>
        )
    }
}

export default DivisionSubmitForm