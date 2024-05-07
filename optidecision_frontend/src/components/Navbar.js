import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import Logo from '../assets/images/logo.png'; // Chemin vers votre logo
import '../index.css';
//7FC7D9
const NavbarCss = {
  navbar: 'bg-[#A1EAFB] p-3 shadow-md',
  brand: 'text-[#0F1035] text-2xl font-semibold flex items-center', // Ajout de flex pour aligner le logo avec le texte
  logo: 'h-10 w-10 mr-2', // Ajustement de la taille du logo
  link: 'text-[#0F1035] hover:text-[#CABBE9] px-3 py-2 rounded-lg text-sm font-medium no-underline flex items-center',
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
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className={NavbarCss.logo} /> {/* Affichage du logo */}
            <span className={NavbarCss.brand}>OptiDecision</span>
            <button
                className={NavbarCss.mobileMenuButton}
                onClick={toggleMenu}
            >
              <HiMenu className="h-6 w-6 text-[#CABBE9]" />
            </button>
          </div>
          <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
            <NavLink
                to="/"
                className={NavbarCss.link}
                activeclassname="text-[#FFCEF3]"
                onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
                to="/about"
                className={NavbarCss.link}
                activeclassname="text-[#FFCEF3]"
                onClick={toggleMenu}
            >
              About Us
            </NavLink>
            <NavLink
                to="/services"
                className={NavbarCss.link}
                activeclassname="text-[#FFCEF3]"
                onClick={toggleMenu}
            >
              Services
            </NavLink>
            <NavLink
                to="/contact"
                className={NavbarCss.link}
                activeclassname="text-[#FFCEF3]"
                onClick={toggleMenu}
            >
              Contact Us
            </NavLink>
            <NavLink
                to="/login"
                className={NavbarCss.link}
                activeclassname="text-[#FFCEF3]"
                onClick={toggleMenu}
            >
              Login
            </NavLink>
            <NavLink
                to="/demo"
                className={NavbarCss.link}
                activeclassname="text-[#FFCEF3]"
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
