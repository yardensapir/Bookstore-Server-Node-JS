import express from 'express'
import * as bookController from '../controllers/book.controller.js' 

const router = new express.Router()

router.post('/books', bookController.createBook)
router.get('/books',bookController.getBooks)
router.get('/books/:bookID/', bookController.getBook)
export default router