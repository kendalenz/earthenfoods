import React from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';

const App = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-sm'>
        <Link className='navbar-brand link-dark mx-4'>Earthen Foods</Link>
        <button 
          type='button' 
          data-bs-toggle='collapse' 
          data-bs-target='#navbarNav' 
          className='navbar-toggler'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div id='navbarNav' class="collapse navbar-collapse mx-4 justify-content-end">
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='link-dark mx-4' to='/#'>Shop</Link>
            </li>
            <li className='nav-item'>
              <Link className='link-dark mx-4' to='/#'>Cart</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Home />
    </div>
  )
};

export default App;