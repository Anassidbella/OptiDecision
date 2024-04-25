import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={NavbarCss.navbar}>
      <div className="container mx-auto md:flex md:justify-between">
        <div className="flex items-center justify-between">
          <span className={NavbarCss.brand}>OptiDecision</span>
          <button
            className={NavbarCss.mobileMenuButton}
            onClick={toggleMenu}
          >
            <HiMenu className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className={`md:flex md:items-end ${isOpen ? 'block' : 'hidden'}`}> 
          <NavLink
            to="/"
            className={NavbarCss.link}
            activeclassname="bg-gray-900"
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={NavbarCss.link}
            activeclassname="bg-gray-900"
            onClick={toggleMenu}
          >
            About Us
          </NavLink>
          <NavLink
            to="/services"
            className={NavbarCss.link}
            activeclassname="bg-gray-900"
            onClick={toggleMenu}
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={NavbarCss.link}
            activeclassname="bg-gray-900"
            onClick={toggleMenu}
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/login"
            className={NavbarCss.link}
            activeclassname="bg-gray-900"
            onClick={toggleMenu}
          >
            Login
          </NavLink>
          <NavLink
            to="/demo"
            className={NavbarCss.link}
            activeclassname="bg-gray-900"
            onClick={toggleMenu}
          >
            Demo
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
