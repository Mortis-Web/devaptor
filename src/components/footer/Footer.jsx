import { FaDiscord, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const links = [
    {
      href: '#1',
      icon: <FaDiscord />,
    },
    {
      href: '#2',
      icon: <FaTwitter />,
    },
    {
      href: '#3',
      icon: <FaFacebook />,
    },
    {
      href: '#4',
      icon: <FaWhatsapp />,
    },
  ];
  return (
    <footer className="bg-red-400 py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm md:text-left">
          &copy; Devaptor 2025. All Rights Reserved.
        </p>
        <div className="flex justify-center gap-4 md:justify-start">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-black duration-400 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <a
          href="#privacy-policy"
          className="text-center text-sm hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
