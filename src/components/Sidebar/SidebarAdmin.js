import React from 'react'
import urls from '../../lib/urls'


const SidebarAdmin = () => {
    return (
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Dashboard">
                <a class="nav-link" href={urls.ADMIN_DASHBOARD_VIEW}>
                    <i class="fa fa-fw fa-home"></i>
                    <span class="nav-link-text"> Yönetim</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Posts">
                <a class="nav-link" href={urls.ADMIN_POST_LIST_VIEW}>
                    <i class="fa fa-fw fa-bars"></i>
                    <span class="nav-link-text"> Yazılar</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Messages">
                <a class="nav-link" href={urls.ADMIN_MESSAGE_LIST_VIEW}>
                    <i class="fa fa-fw fa-envelope-open"></i>
                    <span class="nav-link-text"> Mesajlar</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Bookings">
                <a class="nav-link" href={urls.ADMIN_RESERVATION_LIST_VIEW}>
                    <i class="fa fa-fw fa-calendar-check"></i>
                    <span class="nav-link-text"> Rezervasyonlar</span>
                </a>
            </li>

            {/* <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Reviews">
                <a class="nav-link" href="/admin/degerlendirmeler">
                    <i class="fa fa-fw fa-star"></i>
                    <span class="nav-link-text"> Değerlendirmeler/Yorumlar</span>
                </a>
            </li> */}
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Add listing">
                <a class="nav-link" href={urls.ADMIN_CATEGORY_LIST_VIEW}>
                    <i class="fa fa-fw fa-list"></i>
                    <span class="nav-link-text"> Kategoriler</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Add listing">
                <a class="nav-link" href={urls.ADMIN_SERVICE_LIST_VIEW}>
                    <i class="fa fa-fw fa-cubes"></i>
                    <span class="nav-link-text"> Aktiviteler</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Add listing">
                <a class="nav-link" href={urls.ADMIN_LOGOUT_VIEW}>
                    <i class="fa fa-fw fa-times"></i>
                    <span class="nav-link-text"> Çıkış Yap</span>
                </a>
            </li>
        </ul>
    )
}

export default SidebarAdmin