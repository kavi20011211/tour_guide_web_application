import React,{useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {signIn,reset} from '../../features/auth/authSlice';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user,isError,isLoading,message,isSuccess} = useSelector((state)=>state.auth);

  const [formData,setFormData]=useState({
    email:'',
    password:''
  })

  const {email,password} = formData;

  const onChange =(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit =(e)=>{
    e.preventDefault();

    const userData = {
      email,
      password
    }
    console.log(userData)
    dispatch(signIn(userData));
  }



  useEffect(() => {
    
    if (user || isSuccess) {
      navigate('/');
    }
    
    if (isError) {
      console.log(message);
      // alert(message)
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  if (isLoading) {
    <CircularProgress/>
  }
  return (
    <div className='login-box-container'>
      <div className='login-image-box-container'></div>
      <div className='login-form-box-container'>
        <h1>LOGIN HERE</h1>
        <p>Use your credentials</p>
        
        <form onSubmit={onSubmit}>
        <input type='email' placeholder='Enter email' name='email' id='email' onChange={onChange} value={email}/>
        <input type='password' placeholder='Enter password' name='password' id='password' onChange={onChange} value={password}/>
        <button>SignIn</button>
        </form>
      </div>
    </div>
  )
}

export default Login