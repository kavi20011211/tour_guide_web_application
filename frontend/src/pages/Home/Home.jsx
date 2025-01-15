import React,{useEffect} from 'react'
import Header from '../../components/Header'
import { useSelector,useDispatch } from 'react-redux'
import{useNavigate} from 'react-router-dom'
import {getBook,reset} from '../../features/bookings/bookSlice'
import BookingCard from '../../components/BookingCard'

function Home() {
  const{user} = useSelector((state)=>state.auth);
  const {orders,isError,message} = useSelector((state)=>state.book)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!user){
      navigate('/')
    }else{
      dispatch(getBook())
    }

    if(isError){
      console.log(message)
    }
   
    return ()=>{
      dispatch(reset());
    }
  },[user,navigate,isError,message,dispatch])

  return (
    <>
      <Header/>
      <div className='dashboard-box-container'>
        <div className='dashboard-image-box-container'></div>
        <div className='dashboard-form-box-container'>
          <h1>Hello welcome {user && user.name}!</h1>

          {orders.length>0?(
            orders.map((order)=>
            (<BookingCard key={order?._id} booking={order}/>))):(<h3> You have not set any goals</h3>)}  

        </div>
      </div>
    </>
  )
}

export default Home