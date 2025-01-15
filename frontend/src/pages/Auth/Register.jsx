import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {signUp,reset} from '../../features/auth/authSlice'

function Register(){
  const {user,isSuccess,isError,message} = useSelector((state)=>state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmpassword:''
  })

  const {name,email,password,confirmpassword} = formData

  const onChange =(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit=(e)=>{
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      confirmpassword
    }
    console.log(userData)
    dispatch(signUp(userData))

  }

  useEffect(()=>{
    if(isError){
      console.log(message)
    }

    if(user || isSuccess){
      navigate('/')
    }

    dispatch(reset())
  },[user,isError,isSuccess,message,navigate,dispatch]);

  return (
    <div className='register-box-container'>
      <div className='register-form-box-container'>
        <h1>REGISTER HERE</h1>
        
        <form onSubmit={onSubmit}>
        <input type='text' placeholder='Enter your name' name='name' id='name' value={name} onChange={onChange}/>
        <input type='email' placeholder='Enter email' name='email' id='email' value={email} onChange={onChange}/>
        <input type='password' placeholder='Enter password' name='password' id='password' value={password} onChange={onChange}/>
        <input type='password' placeholder='Enter confirm password' name='confirmpassword' id='confirmpassword' value={confirmpassword} onChange={onChange}/>
        <button>SignUp</button>
        </form>
      </div>
      <div className='register-image-box-container'></div>
    </div>
  )
}

export default Register