import './App.css';
import React from 'react'
import Home from './pages/Home';
import { Box } from '@material-ui/core'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import ExerciseDetail from './pages/ExerciseDetail';
import useLocalStorage from './hooks/useLocalStorage'
import PrivateRoute from '../src/components/loginReg/PrivateRoute'

const App = () => {
  const [loggedInUserID] = useLocalStorage("userID", null);
  const isLoggedIn = loggedInUserID !== null;
  console.log('userID from local storage', loggedInUserID);

  return (
    <Box width="400px" sx={{ width: { xl: '1488px' }}} m="auto">
      <Navbar />
      <Routes>
        <Route path='/' element={<PrivateRoute component={Home} isAuthorized={isLoggedIn}/>} />
        <Route path='/exercise/:id' element={<PrivateRoute component={ExerciseDetail} isAuthorized={isLoggedIn}/>} />
      </Routes>
      <Footer />
    </Box>
  )
}

export default App
