import React from 'react';
import { FaGithub, FaFacebook, FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
      <footer style={{ backgroundColor: '#A1EAFB', color: '#365486', padding: '20px 0', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <button style={{ backgroundColor: '#FDFDFD', border: 'none', marginRight: '10px', padding: '5px', borderRadius: '5px' }}>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#000', fontSize: '24px' }}><FaGithub /></a>
          </button>
          <button style={{ backgroundColor: '#FFCEF3', border: 'none', marginRight: '10px', padding: '5px', borderRadius: '5px' }}>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#000', fontSize: '24px' }}><FaFacebook /></a>
          </button>
          <button style={{ backgroundColor: '#CABBE9', border: 'none', padding: '5px', borderRadius: '5px' }}>
            <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#000', fontSize: '24px' }}><FaGoogle /></a>
          </button>
        </div>
        <p style={{ color: '#0F1035', fontSize: '16px', marginTop: '20px', fontWeight: 'bold' }}>© 2024 Tous droits réservés - OptiDecision</p>
      </footer>
  );
};

export default Footer;
