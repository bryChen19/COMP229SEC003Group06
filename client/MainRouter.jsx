import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import NewShop from './shop/NewShop'
import Shops from './shop/Shops'
import MyShops from './shop/MyShops'
import Shop from './shop/Shop'
import EditShop from './shop/EditShop'
import NewBook from './bookt/NewBook'
import EditBook from './book/EditBook'
import Book from './book/Book'
import Cart from './cart/Cart'
import StripeConnect from './user/StripeConnect'
import ShopOrders from './order/ShopOrders'
import Order from './order/Order'

const MainRouter = () => {
  return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>

        <Route path="/cart" component={Cart}/>
        <Route path="/book/:bookId" component={Book}/>
        <Route path="/shops/all" component={Shops}/>
        <Route path="/shops/:shopId" component={Shop}/>

        <Route path="/order/:orderId" component={Order}/>
        <PrivateRoute path="/librarian/orders/:shop/:shopId" component={ShopOrders}/>

        <PrivateRoute path="/librarian/shops" component={MyShops}/>
        <PrivateRoute path="/librarian/shop/new" component={NewShop}/>
        <PrivateRoute path="/librarian/shop/edit/:shopId" component={EditShop}/>
        <PrivateRoute path="/librarian/:shopId/books/new" component={NewBook}/>
        <PrivateRoute path="/librarian/:shopId/:bookId/edit" component={EditBook}/>

        <Route path="/librarian/stripe/connect" component={StripeConnect}/>
      </Switch>
    </div>)
}

export default MainRouter
