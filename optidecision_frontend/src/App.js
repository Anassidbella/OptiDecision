import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Services from './components/pages/Services';
import Login from './components/pages/Login';
import Footer from './components/Footer'; 
import ProjectSetup from './components/pages/ProjectSetup';
import PairComparison from './components/pages/PairComparison';
import Register from './components/pages/Register';
import RankingPage from './components/pages/RankingPage';
import PrivateRoute from './PrivateRoute';
import Alternative from './components/pages/alternative'
function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 font-mono">
        <NavigationBar />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pair-comparison" element={<PairComparison />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path='/alternative' element={<Alternative />} />
            <Route path="/demo" element={
              <PrivateRoute>
                <ProjectSetup />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
