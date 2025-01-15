import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <>
        <Header/>

        <div className='container'>
            <div className='box-image'>
                <div className='text-container'>
                    <h1>Welcome to Wonder Asia.</h1>
                    <h4>Select | Reserve | Travel</h4>
                </div>
            </div>

            <div className='welcome-info-container'>
                <h1>Travel to make memories</h1>
                <p>You can select places you want to travel and reserve dates from this website.<br/>
                Wonder Asia is a high demand hotel and resourtes chain in Sri Lanka for tourists around the world.<br/>
                Explore the Sri Lanka with a trusted and humble guidence with us.</p>

                <Link to='/login'>Connect with us</Link>
            </div>
        </div>
    </>
  )
}

export default Welcome