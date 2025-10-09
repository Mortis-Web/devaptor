import React from 'react';
import { FaDiscord, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

// Move static data outside component
const SOCIAL_LINKS = [
  { name: 'Discord', href: '#1', icon: <FaDiscord /> },
  { name: 'Twitter', href: '#2', icon: <FaTwitter /> },
  { name: 'Facebook', href: '#3', icon: <FaFacebook /> },
  { name: 'WhatsApp', href: '#4', icon: <FaWhatsapp /> },
];

const Footer = React.memo(() => {
  return (
    <footer className="bg-red-400 py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm md:text-left">
          &copy; Devaptor 2025. All Rights Reserved.
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {SOCIAL_LINKS.map(({ href, icon, name }) => (
            <a
              key={href}
              href={href}
              title={name}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-black transition-colors duration-300 ease-in-out hover:text-white"
            >
              {icon}
            </a>
          ))}
        </div>

        <a
          title="Privacy Policy"
          href="#privacy-policy"
          className="text-center text-sm hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
});

export default Footer;
