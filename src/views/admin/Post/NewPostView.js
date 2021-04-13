import React from 'react'
import FormPost from '../../../components/Form/FormPost'
import urls from '../../../lib/urls'
import BreadcrumbAdmin from '../../../components/Breadcrumb/BreadcrumbAdmin'
import NavbarAdmin from '../../../components/Navbar/NavbarAdmin'

const NewPostView = () => {
    return (
        <>
            <NavbarAdmin />

            <BreadcrumbAdmin />
            <div className="box_general">
                <div class="header_box">
                    <h2 class="d-inline-block">Yeni Yazı Ekle</h2>
                    <a href={urls.ADMIN_POST_LIST_VIEW} class="btn_2 gray approve float-right"><i class="fa fa-fw fa-times-circle-o"></i> Yazılar</a>

                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <FormPost />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewPostView