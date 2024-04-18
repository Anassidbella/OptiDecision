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
import AhpPage from './components/pages/AhpPage'



function App() {
  return (
    <Router>
    <div className="d-flex flex-column min-vh-100"> {/* This div wraps your entire app */}
        <NavigationBar />
        <main className="flex-fill"> {/* This main tag wraps the page content and pushes the footer down */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/demo" element={<ProjectSetup />} />
          <Route path="/pair-comparison" element={<PairComparison />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ahp" element={<AhpPage />}/>
        </Routes>
        </main>
        <Footer />
    </div>
    </Router>
    );
}

export default App;