import { useState, useEffect, useRef, useCallback } from "react";
import {  IoIosMenu } from "react-icons/io";
import { useSidebar } from "../context/SidebarContext";
import {getUserInfo} from '../utils/Token'


const Header = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { toggleSidebar } = useSidebar();
  const userInfo = getUserInfo();
  
  

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 w-full z-20 lg:pl-64">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden text-gray-600 hover:text-gray-900 p-2 mr-2 transition-colors"
            aria-label="Toggle sidebar"
          >
            <IoIosMenu size={24} />
          </button>
          
          <h1 className="text-lg font-semibold text-gray-800 capitalize">
            {title}
          </h1>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1  px-4 py-2 rounded-lg bg-gray-100 transition-colors cursor-pointer"
            role="button"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <div className="w-8 h-8 rounded-full bg-accent-cyan-blue uppercase flex items-center justify-center bg-white text-black font-medium">
              {userInfo.user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-black">{userInfo.user.name}</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;