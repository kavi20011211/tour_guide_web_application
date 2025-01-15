const Bookings = require('../models/Booking')
const asyncHandler = require('express-async-handler')

const createBooking = asyncHandler(async(req,res)=>{
    const {booking_date,locations} = req.body
    if(!booking_date||!locations){
        return res.status(400).json({'error':"Required fields must be filled"})
    }

    const book = Bookings.create({
        user:req.user.id,
        booking_date,
        locations
    })

    if(!book){
        return res.status(400).json({'error':"Something went wrong"})
    }

    res.status(200).json({'booking':book})
})

const getBooks = asyncHandler(async(req,res) => {
    const books = await Bookings.find({user: req.user.id })
    if(books == null){
        return res.status(400).json({"error":"No bookings are found!"});
    }
    res.status(200).json(books);
})

const deleteBooks = asyncHandler(async(req,res) => {
    const book = await Bookings.findById(req.params.id);
    if(!book){
        return res.status(400).json({error:"Booking not found!"});
    }

     if(!req.user){
         res.status(401)
         throw new Error("User not found!");
     }
 
     //Make sure login user is macthed
     if(book.user.toString()!== req.user.id){
         res.status(400)
         throw new Error("User not matched!");
     }

    await book.deleteOne();
    res.status(200).json({id:req.params.id});
})


module.exports = {
    createBooking,
    deleteBooks,
    getBooks
}