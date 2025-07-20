import React from "react";
import { BookOpen } from "lucide-react";

const Footer: React.FC = () => {
    
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Vidyalya</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering learners worldwide with cutting-edge skills and industry expertise.
            </p>
            <div className="flex space-x-4">
              {["f", "t", "in"].map((icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold">{icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Courses Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Courses</h4>
            <ul className="space-y-2 text-gray-400">
              {["Web Development", "Data Science", "Digital Marketing", "UI/UX Design"].map((course, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors">{course}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {["About Us", "Careers", "Blog", "Contact"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              {["Help Center", "Privacy Policy", "Terms of Service", "Refund Policy"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Vidyalya. All rights reserved. Built with passion for education.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
