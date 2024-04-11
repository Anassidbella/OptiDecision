// In src/components/Footer.js
import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-100 text-center text-xs p-3 absolute bottom-0 w-full">
            <p>© {new Date().getFullYear()} OptiDecision. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
