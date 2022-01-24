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
import Content from './pages/Content'
import './bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  return (
      <div className=" d-flex flex-column min-vh-100">
        <Header className="" />
        <div className='flex-fill'>
        <Routes>
          <Route path="/content/:id" element={<Content />} />
          <Route path="/content" element={<Content />} />
          <Route path="/about" element={<About />} />
          <Route path="/report" element={<Report />} />
          <Route path="/search" element={<Search />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/" element={<Home />} />
        </Routes>
        </div>
        <Footer/>
      </div>
  );
}

export default App;
