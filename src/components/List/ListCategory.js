import React from 'react'
import noImg from '../../images/no-image.png'
import urls from '../../lib/urls'


const ListPost = (props) => {

    let categoryImage = (
        <img src={noImg} alt="" />
    )
    if (props.category.category_image) {
        categoryImage = (
            <img src={`${process.env.REACT_APP_API_ENDPOINT}file/${props.category.category_image.name}`} alt="" />
        )
    }



    return (
        <li>
            <figure>
                {categoryImage}
            </figure>
            <h4>{props.category.category_name} <small>{props.category.category_type}</small></h4>
            <p>{props.category.category_description}</p>
            <ul class="buttons">
                <li><a href={`${urls.ADMIN_UPDATE_CATEGORY_VIEW}/${props.category._id}`} class="btn_1 gray approve"><i class="fas fa-edit"></i> Düzenle</a></li>
                <li><a data-id={props.category._id} onClick={props.onClick} class="btn_1 gray delete"><i class="fa fa-fw fa-times"></i> Sil</a></li>
            </ul>
        </li>
    )
}

export default ListPost