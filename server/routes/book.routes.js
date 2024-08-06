import express from 'express'
import bookCtrl from '../controllers/book.controller.js' 
import authCtrl from "../controllers/auth.controller.js";
import shopCtrl from "../controllers/shop.controller.js";

 const router = express.Router();

 router
 .route("/api/books/by/:shopId")
 .post(authCtrl.requireSignin, shopCtrl.isOwner, bookCtrl.create)
 .get(bookCtrl.listByShop);

 router.route("/api/books/:bookId").get(bookCtrl.read);

 router
   .route("/api/book/image/:bookId")
   .get(bookCtrl.photo, bookCtrl.defaultPhoto);
 router.route("/api/book/defaultphoto").get(bookCtrl.defaultPhoto);
 
 router
   .route("/api/book/:shopId/:bookId")
   .put(authCtrl.requireSignin, shopCtrl.isOwner, bookCtrl.update)
   .delete(authCtrl.requireSignin, shopCtrl.isOwner, bookCtrl.remove);
 
 router.param("shopId", shopCtrl.shopByID);
 router.param("bookId", bookCtrl.bookByID);
 export default router
