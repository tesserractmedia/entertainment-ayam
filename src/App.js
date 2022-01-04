import logo from './logo.svg';
import './App.css';
import { Route, Routes, } from 'react-router-dom';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import About from './pages/About';
import Home
  from './pages/Home';
import React from 'react';
import Report from './pages/Report';
import Search
 from './pages/Search';
 import Guide from './pages/Guide';
 
function App() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/report" element={<Report/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/guide" element={<Guide/>}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
}

export default App;
