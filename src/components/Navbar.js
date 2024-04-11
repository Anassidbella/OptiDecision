import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi'; 
import '../index.css';

const NavbarCss = {
  navbar: 'bg-[#6C0345] p-4',
  brand: 'text-yellow-300 text-xl font-mono font-semibold',
  link: 'text-white hover:bg-gray-700 px-3 py-2 rounded-2xl text-sm font-medium',
  mobileMenuButton: 'block md:hidden',
  mobileMenu: 'md:hidden',
};

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={NavbarCss.navbar}>
      <div className="container mx-auto xl:flex xl:justify-between">
        <div className="flex items-center justify-between">
          <span className={NavbarCss.brand}>OptiDecision</span>
          <button
            className={NavbarCss.mobileMenuButton}
            onClick={toggleMenu}
          >
            <HiMenu className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}> 
          <NavLink
            to="/"
            className={NavbarCss.link}
            activeClassName="bg-gray-900"
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={NavbarCss.link}
            activeClassName="bg-gray-900"
            onClick={toggleMenu}
          >
            About Us
          </NavLink>
          <NavLink
            to="/services"
            className={NavbarCss.link}
            activeClassName="bg-gray-900"
            onClick={toggleMenu}
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={NavbarCss.link}
            activeClassName="bg-gray-900"
            onClick={toggleMenu}
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/login"
            className={NavbarCss.link}
            activeClassName="bg-gray-900"
            onClick={toggleMenu}
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
