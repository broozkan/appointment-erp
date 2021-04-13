import React from 'react'
import UnorderedListPost from '../../../components/UnorderedList/UnorderedListPost'
import BreadcrumbAdmin from '../../../components/Breadcrumb/BreadcrumbAdmin'
import NavbarAdmin from '../../../components/Navbar/NavbarAdmin'
import urls from '../../../lib/urls'

const PostsView = () => {
    return (
        <>
            <NavbarAdmin />
            <BreadcrumbAdmin />
            <div className="box_general">
                <div class="header_box">
                    <h2 class="d-inline-block">Yazılar</h2>
                    <a href={urls.ADMIN_NEW_POST_VIEW} class="btn_2 gray approve float-right"><i class="fas fa-plus-circle"></i> Yeni Yazı Ekle</a>
                </div>
                <div className="list_general reviews">
                    <UnorderedListPost />
                </div>
            </div>
        </>
    )
}

export default PostsView