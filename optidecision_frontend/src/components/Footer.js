import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; 
import '../index.css';

const FooterCss = {
  footer: 'bg-[#6C0345] p-4',
  container: 'container mx-auto justify-between',
  link: 'text-yellow-300 hover:text-white ml-6',
  icon: 'text-yellow-300 hover:text-white ml-8 ',
  names: 'text-gray-200 text-xs',
};

function Footer() {
  return (
    <footer className={FooterCss.footer}>
      <div className={FooterCss.container}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className='flex justify-between mx-auto'>
            <p className="text-white flex items-center space-x-4">
              OptiDecision - All rights reserved
              <a href="/privacyPolicy" className={FooterCss.link}>Privacy Policy</a>
              <a href="/terms" className={FooterCss.link}>Terms of Service</a>
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-end">
            <div className="flex items-center md:ml-8">
              <a href="/facebook" className={FooterCss.icon}><FaFacebook /></a>
              <a href="/twitter" className={FooterCss.icon}><FaTwitter /></a>
              <a href="/likendeIn" className={FooterCss.icon}><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-gray-200 text-xs">Noussair Abellouch - Anass Idbella - Tarik Elqari- Salma Idmansour - Meriem Achegri</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
