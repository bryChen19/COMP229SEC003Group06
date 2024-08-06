import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './lib/Signin' //try auth if lib isn't found
import Profile from './user/Profile'
import PrivateRoute from './lib/PrivateRoute' //try auth if lib isn't found
import NewShop from './shop/NewShop.jsx'
import MyShops from './shop/MyShops.jsx';
import EditShop from './shop/EditShop';
import EditProfile from './user/EditProfile.jsx'
import NewBook from './book/NewBook.jsx'
import EditBook from "./book/EditBook.jsx";
import Menu from "./core/Menu";

function MainRouter() {
    return (
        <div>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/user/:userId" element={<Profile />} />
                <Route 
                    path="/user/edit/:userId"
                    element={
                        <PrivateRoute>
                            <EditProfile />
                        </PrivateRoute>
                    }
                    />

                <Route path="/shops/all" element={<Shops />} />

                <Route path="/shops/:shopId" element={<Shop />} />

                <Route path="/librarian/shop/new" 
                    element={
                        <PrivateRoute>
                            <NewShop />
                        </PrivateRoute>
                    } />
                <Route path="/librarian/shops" 
                    element={
                        <PrivateRoute>
                            <MyShops />
                        </PrivateRoute>
                        } /> 
                <Route path="/librarian/shop/edit/:shopId" 
                    element={
                        <PrivateRoute>
                            <EditShop />
                        </PrivateRoute>
                        } /> 

                <Route path="/librarian/:shopId/book/new" 
                    element={
                        <PrivateRoute>
                            <NewBook />
                        </PrivateRoute>
                        } /> 
                <Route path="/librarian/:shopId/:bookId/edit" 
                    element={
                        <PrivateRoute>
                            <EditBook />
                        </PrivateRoute>
                        } /> 
                
            </Routes>
        </div>
    );
}

export default MainRouter
