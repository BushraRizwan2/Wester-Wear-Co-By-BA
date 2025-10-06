import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => (
  <a href={href} className="text-gray-300 hover:text-white transition-colors duration-300" aria-label={label} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const LinkedInIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const WhatsAppIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.433-9.896-9.896-9.896-5.461 0-9.887 4.434-9.889 9.896.001 2.245.753 4.413 2.124 6.212l-1.356 4.953 5.013-1.324zM12 4.09c4.913 0 8.904 3.991 8.904 8.904s-3.991 8.904-8.904 8.904-8.904-3.991-8.904-8.904c0-2.393.958-4.636 2.645-6.258C8.245 4.863 10.06 4.09 12 4.09m-.011 2.895c-3.216 0-5.833 2.618-5.833 5.834 0 1.592.639 3.125 1.794 4.281l-.222.815-.845 3.111 3.177-.837.784-.211c1.134.592 2.395.918 3.693.918 3.216 0 5.833-2.617 5.833-5.833s-2.617-5.834-5.833-5.834m4.555 7.427c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.282-1.554s-.011-.354.102-.467c.1-.102.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383-.131-.005-.281-.005-.431-.005s-.393.056-.61.332c-.217.276-.835.815-.835 1.987s.854 2.316.97 2.474c.113.159 1.695 2.589 4.101 3.633.593.251 1.054.401 1.414.515.55.172 1.054.147 1.442.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.066-.056-.094-.207-.151-.431-.265z"/></svg>
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
              <SocialIcon href="https://www.facebook.com/BushraRizwanKhan/" label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/bushrarizwankhan/" label="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.25-10a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="https://x.com/bushra_rizwan" label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/in/bushrarizwan/" label="LinkedIn">
                <LinkedInIcon />
              </SocialIcon>
              <SocialIcon href="https://wa.me/923226153093" label="WhatsApp">
                <WhatsAppIcon />
              </SocialIcon>
            </div>
          </div>
          
          {/* Column 2: Shop Links */}
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-gray-200">Shop</h4>
            <ul className="mt-4 space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/category/summer" className="text-gray-300 hover:text-white transition-colors duration-300">Summer Collection</Link></li>
              <li><Link to="/category/winter" className="text-gray-300 hover:text-white transition-colors duration-300">Winter Collection</Link></li>
              <li><Link to="/wishlist" className="text-gray-300 hover:text-white transition-colors duration-300">My Wishlist</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-white transition-colors duration-300">Shopping Cart</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Support */}
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-gray-200">Support</h4>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Help & FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Shipping & Returns</a></li>
              <li><Link to="/size-guide" className="text-gray-300 hover:text-white transition-colors duration-300">Size Guide</Link></li>
              <li><Link to="/admin" className="text-gray-300 hover:text-white transition-colors duration-300">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-gray-200">Contact Us</h4>
            <div className="mt-4 space-y-3 text-sm text-gray-300">
              <p>123 Cowboy Way, Austin, TX 73301</p>
              <p>
                <a href="mailto:bushrarizwan2@gmail.com" className="hover:text-white">bushrarizwan2@gmail.com</a>
              </p>
              <p>
                <a href="https://wa.me/923226153093" className="hover:text-white" target="_blank" rel="noopener noreferrer">WhatsApp: +923226153093</a>
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