import React from "react";
import {useDispatch} from 'react-redux'
import {deleteBook} from '../features/bookings/bookSlice'

function BookingCard({ booking }) {
//   const { booking_date, locations } = booking;
const dispatch = useDispatch()
const onDeleteBtn=(id)=>{
    dispatch(deleteBook(id))
}
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        maxWidth: "400px",
      }}
    >
      <h2 style={{ margin: "0 0 12px 0", fontSize: "18px", color: "#333" }}>
        Booking Details
      </h2>
      <div style={{ marginBottom: "12px" }}>
        <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
          <strong>Start Date:</strong> {new Date(booking?.booking_date[0]).toLocaleDateString()}
        </p>
        <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
          <strong>End Date:</strong> {new Date(booking?.booking_date[1]).toLocaleDateString()}
        </p>
      </div>
      <div>
        <h3 style={{ fontSize: "16px", color: "#333", margin: "0 0 8px 0" }}>
          Locations:
        </h3>
        {booking.locations.length > 0 ? (
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              margin: "0",
              color: "#555",
              fontSize: "14px",
            }}
          >
            {booking?.locations.map((location, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "8px",
                  marginBottom: "8px",
                  borderRadius: "4px",
                }}
              >
                {location}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: "0", color: "#888" }}>No locations selected.</p>
        )}
      </div>
      <button style={{
        padding:"10px 15px",
        backgroundColor:'red',
        color:'white',
        fontWeight:'bold',
        border:'none'
      }} onClick={()=>onDeleteBtn(booking?._id)}>Delete</button>
    </div>
  );
}

export default BookingCard;
