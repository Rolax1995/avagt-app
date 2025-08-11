import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

/*import logo from './logo.svg';
import './App.css';*/

function App() {
  return (
    <div>
      <Navbar/>
      <div className='container mt-4'>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
