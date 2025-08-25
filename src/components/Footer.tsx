import React from 'react';
import { TrendingUp, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Data Science Navigator</h3>
                <p className="text-sm text-gray-400">AI-Powered Career Intelligence</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering students and professionals to align their skills and career trajectories 
              with dynamic labour market opportunities through intelligent AI analysis.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>info@datasciencenavigator.co.uk</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/resume-analysis" className="hover:text-white transition-colors">Resume Analysis</a></li>
              <li><a href="/market-insights" className="hover:text-white transition-colors">Market Insights</a></li>
              <li><a href="/university-connections" className="hover:text-white transition-colors">University Connections</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Data Science Navigator. All rights reserved. Powered by AI for career excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;