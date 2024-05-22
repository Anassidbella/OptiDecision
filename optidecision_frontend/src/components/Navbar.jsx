import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import '../index.css';
const NavbarCss = {
  navbar: 'bg-[#6C0345] p-3 ',
  brand: 'text-yellow-300 text-xl font-mono font-semibold',
  link: 'text-white hover:bg-[#DC6B19] px-3 py-2 rounded-2xl text-sm font-medium no-underline flex mt-2',
  mobileMenuButton: 'block md:hidden',
  mobileMenu: 'md:hidden',
};

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setUsername(user);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/login');
  };
    
  return (
    <nav className={NavbarCss.navbar}>
      <div className="container mx-auto md:flex md:justify-between">
        <div className="flex items-center justify-between">
        <span className={NavbarCss.brand}>
          Optidecision
        </span>
          <button className={NavbarCss.mobileMenuButton} onClick={toggleMenu}>
            <HiMenu className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className={`md:flex md:items-end ${isOpen ? 'block' : 'hidden'}`}>
          <NavLink to="/" className={NavbarCss.link} onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/about" className={NavbarCss.link} onClick={toggleMenu}>About Us</NavLink>
          <NavLink to="/services" className={NavbarCss.link} onClick={toggleMenu}>Services</NavLink>
          <NavLink to="/contact" className={NavbarCss.link} onClick={toggleMenu}>Contact Us</NavLink>
          {username ? (
            <>
              <NavLink to="/demo" className={NavbarCss.link} onClick={toggleMenu}>Demo</NavLink>
              <span className={`${NavbarCss.link} mt-2`}>Bonjour, {username}</span>
              <button onClick={handleLogout} className={`${NavbarCss.link} bg-red-500 text-white`}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" className={NavbarCss.link} onClick={toggleMenu}>Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
