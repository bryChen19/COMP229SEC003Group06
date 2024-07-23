import express from 'express'
 import bookCtrl from '../controllers/book.controller.js' 

 const router = express.Router()
 router.route('/api/books').post(bookCtrl.create)
 router.route('/api/books').get(bookCtrlCtrl.list)
 router.route('/api/books/:bookId')
.get(authCtrl.requireSignin, bookCtrl.read)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization, 
bookCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, 
bookCtrl.remove)
router.param('bookId', bookCtrl.bookByID)
 router.route('/api/books/:bookId').get(bookCtrl.read)
 router.route('/api/books/:bookId').put(bookCtrl.update)
 router.route('/api/books/:bookId').delete(bookCtrl.remove)
 export default router
