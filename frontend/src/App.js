import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Auth/Login';
import Home from './pages/Home/Home';
import Welcome from './pages/Welcome';
import Register from './pages/Auth/Register';
import MapPage from './pages/Map/MapPage';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/map' element={<MapPage/>}/>
            <Route path='*' element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>}/>
            <Route path='*' element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
