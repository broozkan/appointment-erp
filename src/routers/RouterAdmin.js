import React, { useEffect, useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation

} from 'react-router-dom'
import NavbarAdmin from '../components/Navbar/NavbarAdmin'
import CategoriesView from '../views/admin/CategoriesView'
import DashboardView from '../views/admin/DashboardView'
import MessagesView from '../views/admin/MessagesView'
import ReservationsView from '../views/admin/ReservationsView'
import ReviewsView from '../views/admin/ReviewsView'
import NewCategoryView from '../views/admin/NewCategoryView'
import NewActivityView from '../views/admin/NewActivityView'
import ActivitiesView from '../views/admin/ActivitiesView'
import NewReservationView from '../views/admin/NewReservationView'
import UpdateCategoryView from '../views/admin/UpdateCategoryView'
import UpdateActivityView from '../views/admin/UpdateActivityView'
import { AdminContextWrapper } from '../contexts/site/AdminContext'
import LoginView from '../views/admin/LoginView'
import LogoutView from '../views/admin/LogoutView'
import ReservationDetailView from '../views/admin/ReservationDetailView'
import urls from '../lib/urls'
import PostsView from '../views/admin/Post/PostsView'
import NewPostView from '../views/admin/Post/NewPostView'

const RouterAdmin = (props) => {



    return (
        <Router>
            <AdminContextWrapper>
                <div id="admin">
                    <div className="content-wrapper" style={{ paddingTop: '70px' }}>
                        <div className="container-fluid">
                            <Switch>
                                <Route path={urls.ADMIN_DASHBOARD_VIEW} exact component={DashboardView}></Route>
                                <Route path="/admin/giris" exact component={LoginView}></Route>
                                <Route path={urls.ADMIN_LOGOUT_VIEW} exact component={LogoutView}></Route>

                                <Route path={urls.ADMIN_MESSAGE_LIST_VIEW} exact component={MessagesView}></Route>
                                <Route path={urls.ADMIN_RESERVATION_LIST_VIEW} exact component={ReservationsView}></Route>
                                <Route path="/admin/rezervasyon/detay/:reservationId" exact component={ReservationDetailView}></Route>
                                <Route path="/admin/degerlendirmeler" exact component={ReviewsView}></Route>
                                <Route path={urls.ADMIN_POST_LIST_VIEW} exact component={PostsView}></Route>
                                <Route path={urls.ADMIN_NEW_POST_VIEW} exact component={NewPostView}></Route>
                                <Route path="/admin/aktiviteler" exact component={ActivitiesView}></Route>
                                <Route path="/admin/aktivite/yeni" exact component={NewActivityView}></Route>
                                <Route path="/admin/aktivite/duzenle/:activityId" exact component={UpdateActivityView}></Route>
                                <Route path="/admin/kategoriler" exact component={CategoriesView}></Route>
                                <Route path="/admin/kategori/yeni" exact component={NewCategoryView}></Route>
                                <Route path="/admin/kategori/duzenle/:categoryId" exact component={UpdateCategoryView}></Route>
                            </Switch>
                        </div>
                    </div>


                </div>
            </AdminContextWrapper>


        </Router>
    )

}

export default RouterAdmin