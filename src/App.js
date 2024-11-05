import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TokenList from './components/TokenList';
import UsersPage from './components/UsersPage';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <Router>
      <nav className="navbar">
      <NavLink 
        to="/" 
        className="nav-link" 
        activeClassName="active"
        end
      >
        Tokens
      </NavLink>
      <NavLink 
        to="/users" 
        className="nav-link" 
        activeClassName="active"
      >
        Users
      </NavLink>
    </nav>
      <Routes>
        <Route path="/" element={<TokenList />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React from 'react';
// import TokenList from './components/TokenList';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <TokenList />
//     </div>
//   );
// }

// export default App;
