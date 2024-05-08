import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from '@headlessui/react'; // Utilisation des composants de UI
import { HiMenu } from 'react-icons/hi';
import Logo from '../assets/images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
      <nav className="bg-gray-900 text-white shadow-lg py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-10 w-10 mr-2" />
            <span className="text-xl font-semibold">OptiDecision</span>
          </div>
          <div className="md:hidden">
            <Menu as="div" className="relative">
              {({ open }) => (
                  <>
                    <Menu.Button className="text-white">
                      <HiMenu className="h-6 w-6" />
                    </Menu.Button>
                    {open && (
                        <Menu.Items className="absolute right-0 top-12 bg-white p-2 rounded-md shadow-lg">
                          <Menu.Item>
                            {({ active }) => (
                                <NavLink to="/" className={`block px-4 py-2 ${active ? 'bg-gray-200' : ''}`} onClick={toggleMenu}>
                                  Home
                                </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                                <NavLink to="/about" className={`block px-4 py-2 ${active ? 'bg-gray-200' : ''}`} onClick={toggleMenu}>
                                  About Us
                                </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                                <NavLink to="/services" className={`block px-4 py-2 ${active ? 'bg-gray-200' : ''}`} onClick={toggleMenu}>
                                  Services
                                </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                                <NavLink to="/contact" className={`block px-4 py-2 ${active ? 'bg-gray-200' : ''}`} onClick={toggleMenu}>
                                  Contact Us
                                </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                                <NavLink to="/login" className={`block px-4 py-2 ${active ? 'bg-gray-200' : ''}`} onClick={toggleMenu}>
                                  Login
                                </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                                <NavLink to="/demo" className={`block px-4 py-2 ${active ? 'bg-gray-200' : ''}`} onClick={toggleMenu}>
                                  Demo
                                </NavLink>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                    )}
                  </>
              )}
            </Menu>
          </div>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" className="text-white hover:bg-gray-800 px-3 py-2 rounded-md">Home</NavLink>
            <NavLink to="/about" className="text-white hover:bg-gray-800 px-3 py-2 rounded-md">About Us</NavLink>
            <NavLink to="/services" className="text-white hover:bg-gray-800 px-3 py-2 rounded-md">Services</NavLink>
            <NavLink to="/contact" className="text-white hover:bg-gray-800 px-3 py-2 rounded-md">Contact Us</NavLink>
            <NavLink to="/login" className="text-white hover:bg-gray-800 px-3 py-2 rounded-md">Login</NavLink>
            <NavLink to="/demo" className="text-white hover:bg-gray-800 px-3 py-2 rounded-md">Demo</NavLink>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
