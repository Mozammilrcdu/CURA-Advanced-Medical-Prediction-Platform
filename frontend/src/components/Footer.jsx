import React from 'react';
import { Link } from 'react-router-dom';
import {Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
            <div className="relative">
               <img src="/logo.png" alt="CURA Logo" className="h-18 w-36 object-contain" />
            </div>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Advanced AI-powered medical prediction platform providing early disease detection 
              and health insights through cutting-edge machine learning technology.
            </p>
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">© 2025 CURA by Mozammil. All rights reserved.</p>
              <p>Empowering healthcare through intelligent predictions</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About CURA
                </Link>
              </li>
              <li>
                <Link to="/prediction" className="text-muted-foreground hover:text-primary transition-colors">
                  Medical Predictions
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Health Assistant
                </Link>
              </li>
              <li>
                <Link to="/advice" className="text-muted-foreground hover:text-primary transition-colors">
                  Health Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm"><a href="mailto:mdmozammilrcdu67@gmail.com" className="text-sm hover:underline">support@cura-medical.com</a></span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91-9876543210</span>
              </li>
              <li className="flex items-start space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="text-sm">Medical AI Research Center<br />123 Health Tech</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-primary transition-colors">Privacy Policy</button>
              <button className="hover:text-primary transition-colors">Terms of Service</button>
              <button className="hover:text-primary transition-colors">Medical Disclaimer</button>
            </div>
            <p className="text-sm text-muted-foreground">
              Not a substitute for professional medical advice
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;