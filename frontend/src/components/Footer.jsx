// frontend/src/components/layout/Footer.jsx
import { Mail, Github, Twitter, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-white">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                DevTriage-AI
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md leading-relaxed">
              AI-powered developer support platform connecting you with expert mentors instantly. Resolve coding issues faster than ever.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Become a Mentor
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              © 2025 DevTriage-AI. All rights reserved. Made with 
              <Heart size={14} className="text-red-500 fill-current animate-pulse" /> 
              for developers
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Status</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Careers</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}