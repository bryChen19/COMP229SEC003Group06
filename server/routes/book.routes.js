import express from 'express'
 import bookCtrl from '../controllers/book.controller.js' 

 const router = express.Router()
 router.route('/api/books').post(bookCtrl.create)
 router.route('/api/books').get(bookCtrl.list)
 router.route('/api/books/:bookId')
.get(bookCtrl.read)
.put(bookCtrl.update)
.delete(bookCtrl.remove)
router.param('bookId', bookCtrl.bookByID)
 router.route('/api/books/:bookId').get(bookCtrl.read)
 router.route('/api/books/:bookId').put(bookCtrl.update)
 router.route('/api/books/:bookId').delete(bookCtrl.remove)
 export default router
