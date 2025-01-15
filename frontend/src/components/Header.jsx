import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {logout,reset} from '../features/auth/authSlice'
function Header() {

const dispatch = useDispatch()
const navigate = useNavigate()

    const {user} = useSelector((state)=>state.auth);

const logoutBtn =()=>{
 dispatch(logout());
 dispatch(reset());
 navigate('/');
}
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>WonderAsia</Link>
        </div>
        <ul>
        {user ? (
            <>
            <li>
                <Link to={'/map'}>Reserve</Link>
            </li>
                <li>
                    <button className='btn' onClick={logoutBtn}> Logout
                    </button>
                </li>
            </>
        ):(<>
            <li>
                <Link to='/register'> Register</Link>
            </li>
            <li>
                <Link to='/login'> Login</Link>
            </li>
        </>)}
            
        </ul>
    </header>
  )
}

export default Header