import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import SignUp from '../src/component/SignUp';
import Login from './component/LogIn';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path='/login' element={<Login/>}/>
    </Routes>
  </Router>
  );
}

export default App;
