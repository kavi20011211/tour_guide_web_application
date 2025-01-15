const router = require('express').Router()
const {createBooking,deleteBooks,getBooks} = require('../controllers/BookingController')
const{protect} = require('../middlewares/authMiddleware')

router.route('/').get(protect,getBooks).post(protect,createBooking)
router.route('/:id').delete(protect,deleteBooks)

module.exports = router