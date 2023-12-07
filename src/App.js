import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchFilter from './SearchFilter';
import MovieDetailsPage from './MovieDetailsPage'; 
import Signup from './Signup';
import Login from './Login';
import Fantheories from './Fantheories';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/search" element={<SearchFilter />} />
        <Route path="/movie-details/:id" element={<MovieDetailsPage/>} />
        <Route path="/fantheories/:id" element={<Fantheories/>} />
      </Routes>
    </Router>
  );
};

export default App;
