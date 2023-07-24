import React from 'react';
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import {Home} from './Pages/Home';
import {ProductPage} from './Pages/ProductPage';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
            </li>
            <li>
              <NavLink className="btn btn-light btn-outline-primary" to="/product">
              Produits
            </NavLink>
            </li>
          </ul>
        </nav>

        {/* Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
