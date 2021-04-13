import React from 'react'
import noImg from '../../images/no-image.png'
import urls from '../../lib/urls'


const ListPost = (props) => {

    let postImage = (
        <img src={noImg} alt="" />
    )
    if (props.post.post_image) {
        postImage = (
            <img src={`${process.env.REACT_APP_API_ENDPOINT}file/${props.post.post_image.name}`} alt="" />
        )
    }



    return (
        <li>
            <figure>
                {postImage}
            </figure>
            <h4>{props.post.post_title} <small>{props.post.post_category.category_name}</small></h4>
            <p>{props.post.post_description}</p>
            <ul class="buttons">
                <li><a href={`${urls.ADMIN_UPDATE_POST_VIEW}/${props.post._id}`} class="btn_1 gray approve"><i class="fas fa-edit"></i> Düzenle</a></li>
                <li><a data-id={props.post._id} onClick={props.onClick} class="btn_1 gray delete"><i class="fa fa-fw fa-times"></i> Sil</a></li>
            </ul>
        </li>
    )
}

export default ListPost