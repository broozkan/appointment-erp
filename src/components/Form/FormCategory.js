import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Swal from 'sweetalert2'
import { Component } from 'react'
import SelectLanguage from '../Select/SelectLanguage'
import SelectCategoryType from '../Select/SelectCategoryType'
import DivisionSubmitForm from '../Division/DivisionSubmitForm'

class FormCategory extends Component {

	constructor() {
		super()

		this.state = {
			category_language: 'tr',
			is_category_main: false,
			category_upper_category: {},
			category_type: '',
			category_name: '',
			category_description: '',
			category_image: {},
			category_header_visibility: false,
			is_form_submitting: false,
			categories: [],
			is_categories_loaded: false
		}

		this.resetState = this.resetState.bind(this)
		this.handleOnChange = this.handleOnChange.bind(this)
		this.handleOnSubmit = this.handleOnSubmit.bind(this)
		this.loadCategories = this.loadCategories.bind(this)
	}

	async componentDidMount() {
		if (this.props.category_id) {
			const categories = await api.get('/categories/1', { params: { '_id': this.props.category_id } })

			this.setState({
				is_category_main: categories.data.docs[0].is_category_main,
				category_upper_category: categories.data.docs[0].category_upper_category,
				category_name: categories.data.docs[0].category_name,
				category_description: categories.data.docs[0].category_description,
				category_type: categories.data.docs[0].category_type,
				category_image: categories.data.docs[0].category_image,
				category_header_visibility: categories.data.docs[0].category_header_visibility,
				is_form_submitting: categories.data.docs[0].is_form_submitting
			})
		}

		this.loadCategories()
	}




	resetState = () => {
		this.setState({
			category_language: 'tr',
			is_category_main: true,
			category_upper_category: {},
			category_name: '',
			category_description: '',
			category_image: {},
			category_header_visibility: false,
			is_form_submitting: false
		})
	}

	async loadCategories() {
		const categories = await api.get('/categories/1')

		this.setState({
			categories: categories.data.docs,
			is_categories_loaded: true
		})

	}

	handleOnChange = async (e) => {
		if (e.target.type === "checkbox") {
			console.log(e.target);
			this.setState({
				[e.target.name]: e.target.checked,
				category_upper_category: {}
			})
		} else if (e.target.name == "category_upper_category") {
			let categoryUpperCategory = {}
			this.state.categories.map((item) => {
				if (item._id == e.target.value) {
					categoryUpperCategory = item
				}
			})

			this.setState({
				category_upper_category: categoryUpperCategory
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

		if (this.state.category_image) {
			formData.append('file', this.state.category_image)
		}

		formData.append('data', JSON.stringify(this.state))

		let submitResponse
		if (this.props.category_id) {
			submitResponse = await api.put('/categories/' + this.props.category_id, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
		} else {
			submitResponse = await api.post('/categories', formData)
		}

		if (submitResponse.data.response) {
			Swal.fire({
				title: 'Başarılı',
				text: 'Kategori eklendi',
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

		// render upper categories
		let upperCategoriesJsx = ''
		let upperCategoriesOptionsJsx = ''
		if (!this.state.is_category_main) {
			if (this.state.is_categories_loaded) {
				upperCategoriesOptionsJsx = this.state.categories.map((item) => {
					return (
						<option value={item._id}>{item.category_name}</option>
					)
				})

				upperCategoriesJsx = (
					<div className="form-group">
						<label>Bu kategorinin altında olacak *</label>
						<select className="form-control" name="category_upper_category" value={this.state.category_upper_category._id} onChange={this.handleOnChange}>
							<option value="" disabled selected>Kategori seçiniz</option>
							{upperCategoriesOptionsJsx}
						</select>
					</div>
				)
			}
		}

		return (
			<form onSubmit={this.handleOnSubmit} >
				<div className="form-group">
					<label>Kategori Dili *</label>
					<SelectLanguage value={this.state.category_language} onChange={this.handleOnChange} />
				</div>
				<div className="clearfix add_bottom_15">
					<div className="checkboxes float-left">
						<label className="container_check"> Bu bir ana kategoridir
								<input type="checkbox" name="is_category_main" onChange={this.handleOnChange} checked={this.state.is_category_main} />
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
				{upperCategoriesJsx}
				<div className="form-group">
					<label>Kategori Adı *</label>
					<input type="text" className="form-control" required name="category_name" onChange={this.handleOnChange} value={this.state.category_name} placeholder="Kategori adı giriniz" />
				</div>
				<div className="form-group">
					<label>Kategori Açıklaması *</label>
					<input type="text" className="form-control" required name="category_description" onChange={this.handleOnChange} value={this.state.category_description} placeholder="Kategori açıklaması giriniz" />
				</div>
				<div className="form-group">
					<label>Kategori Tipi *</label>
					<SelectCategoryType value={this.state.category_type} onChange={this.handleOnChange} />
				</div>
				<div className="form-group">
					<label>Kategori Görseli</label>
					<input type="file" className="form-control" name="category_image" onChange={this.handleOnChange} />
				</div>
				<div className="clearfix add_bottom_15">
					<div className="checkboxes float-left">
						<label className="container_check"> Ana sayfada görünsün
							<input type="checkbox" name="category_header_visibility" onChange={this.handleOnChange} checked={this.state.category_header_visibility} />
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
				<DivisionSubmitForm isSubmitting={this.state.is_form_submitting} />
			</form>
		)
	}

}

export default FormCategory