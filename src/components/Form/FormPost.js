import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Swal from 'sweetalert2'
import { Component } from 'react'
import SelectLanguage from '../Select/SelectLanguage'
import DivisionSubmitForm from '../Division/DivisionSubmitForm'
import SelectCategory from '../Select/SelectCategoryType'

class FormPost extends Component {

	constructor() {
		super()

		this.state = {
			post_language: 'tr',
			post_title: '',
			post_description: '',
			post_category: {},
			post_visibility: false,
			post_read_count: 0,
			post_image: {},
			post_sort_number: 0,
			is_form_submitting: false
		}

		this.resetState = this.resetState.bind(this)
		this.handleOnChange = this.handleOnChange.bind(this)
		this.handleOnSubmit = this.handleOnSubmit.bind(this)
		this.loadCategories = this.loadCategories.bind(this)
	}

	async componentDidMount() {
		if (this.props.post_id) {
			const posts = await api.get('/posts/1', { params: { '_id': this.props.post_id } })

			this.setState({
				post_language: posts.data.docs[0].post_language,
				post_title: posts.data.docs[0].post_title,
				post_description: posts.data.docs[0].post_description,
				post_category: posts.data.docs[0].post_category,
				post_visibility: posts.data.docs[0].post_visibility,
				post_read_count: posts.data.docs[0].post_read_count,
				post_image: posts.data.docs[0].post_image,
				post_sort_number: posts.data.docs[0].post_sort_number
			})
		}

	}




	resetState = () => {
		this.setState({
			post_language: 'tr',
			is_post_main: true,
			post_upper_post: {},
			post_name: '',
			post_description: '',
			post_image: {},
			post_header_visibility: false,
			is_form_submitting: false
		})
	}


	handleOnChange = async (e) => {
		if (e.target.type === "checkbox") {
			console.log(e.target);
			this.setState({
				[e.target.name]: e.target.checked,
				post_upper_post: {}
			})
		} else if (e.target.type == "file") {
			this.setState({
				[e.target.name]: e.target.files[0]
			})
		} else {
			this.setState({
				[e.target.name]: e.target.value
			})
		}

	}


	handleOnSubmit = async (e) => {

		e.preventDefault()

		this.setState({
			is_form_submitting: true
		})

		let formData = new FormData()

		if (this.state.post_image) {
			formData.append('file', this.state.post_image)
		}

		formData.append('data', JSON.stringify(this.state))

		let submitResponse
		if (this.props.post_id) {
			submitResponse = await api.put('/posts/' + this.props.post_id, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
		} else {
			submitResponse = await api.post('/posts', formData)
		}

		if (submitResponse.data.response) {
			Swal.fire({
				title: 'Başarılı',
				text: 'Yazı eklendi',
				icon: 'success'
			})
			this.resetState()
		} else {
			Swal.fire({
				title: 'Hata',
				text: submitResponse.data.responseData,
				icon: 'error'
			})

			this.setState({
				is_form_submitting: false
			})
		}

	}

	render() {



		return (
			<form onSubmit={this.handleOnSubmit} >
				<div className="form-group">
					<label>Yazı Dili *</label>
					<SelectLanguage value={this.state.post_language} onChange={this.handleOnChange} />
				</div>
				<div className="form-group">
					<label>Yazı Kategorisi *</label>
					<SelectCategory name="post_category" value={this.state.post_language} onChange={this.handleOnChange} />
				</div>
				<div className="form-group">
					<label>Yazı Adı *</label>
					<input type="text" className="form-control" required name="post_name" onChange={this.handleOnChange} value={this.state.post_name} placeholder="Yazı adı giriniz" />
				</div>
				<div className="form-group">
					<label>Yazı Açıklaması *</label>
					<input type="text" className="form-control" required name="post_description" onChange={this.handleOnChange} value={this.state.post_description} placeholder="Yazı açıklaması giriniz" />
				</div>
			
				<div className="form-group">
					<label>Yazı Görseli</label>
					<input type="file" className="form-control" name="post_image" onChange={this.handleOnChange} />
				</div>
				<div className="clearfix add_bottom_15">
					<div className="checkboxes float-left">
						<label className="container_check"> Ana sayfada görünsün
							<input type="checkbox" name="post_header_visibility" onChange={this.handleOnChange} checked={this.state.post_header_visibility} />
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
				<DivisionSubmitForm isSubmitting={this.state.is_form_submitting} />
			</form>
		)
	}

}

export default FormPost