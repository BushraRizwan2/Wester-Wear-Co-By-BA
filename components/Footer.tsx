import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => (
  <a href={href} className="text-gray-300 hover:text-white transition-colors duration-300" aria-label={label} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-text-primary mt-24">
      <div className="container mx-auto py-16 px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company Info & Social */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-white">
              Western Wear Co.
            </h3>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Timeless style inspired by the pioneering spirit of the West. Curated collections that blend classic heritage with modern sensibilities.
            </p>
            <div className="flex space-x-5 mt-6">
              <SocialIcon href="#" label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.25-10a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="#" label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </SocialIcon>
            </div>
          </div>
          
          {/* Column 2: Company Links */}
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-gray-200">Company</h4>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Press</a></li>
            </ul>
          </div>
          
          {/* Column 3: Support */}
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-gray-200">Support</h4>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Help & FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Size Guide</a></li>
              <li><Link to="/admin" className="text-gray-300 hover:text-white transition-colors duration-300">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-gray-200">Contact Us</h4>
            <div className="mt-4 space-y-3 text-sm text-gray-300">
              <p>123 Cowboy Way, Austin, TX 73301</p>
              <p>
                <a href="mailto:contact@westernwear.co" className="hover:text-white">contact@westernwear.co</a>
              </p>
              <p>
                <a href="tel:+15125550123" className="hover:text-white">(512) 555-0123</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Western Wear Collective. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;