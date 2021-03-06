import React from 'react'
import BreadcrumbAdmin from '../../components/Breadcrumb/BreadcrumbAdmin'
import NavbarAdmin from '../../components/Navbar/NavbarAdmin'
import UnorderedListReservation from '../../components/UnorderedList/UnorderedListReservation'

const MessagesView = () => {
    return (
        <>
        <NavbarAdmin />
            <BreadcrumbAdmin />
            <div className="box_general">
            <div class="header_box">
                <h2 class="d-inline-block">Rezervasyonlar</h2>
                <a href="/admin/rezervasyon/yeni" class="btn_2 gray approve float-right"><i class="fa fa-fw fa-plus-circle"></i> Yeni Rezervasyon Ekle</a>
            
            </div>
            <div className="list_general reviews">
                    <UnorderedListReservation />
                </div>
            </div>
        </>
    )
}

export default MessagesView