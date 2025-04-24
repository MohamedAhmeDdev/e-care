import { useState, useEffect, useRef, useCallback } from "react";
import { 
  FaUser, 
  FaUsers, 
  FaRegCalendarAlt, 
  FaRegEdit, 
} from "react-icons/fa";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

const Header = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { toggleSidebar } = useSidebar();

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
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            role="button"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <div className="w-8 h-8 rounded-full bg-accent-cyan-blue flex items-center justify-center text-white font-medium">
              JD
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-gray-800">Jane Doe</span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>
            <IoIosArrowDown 
              size={16} 
              className={`text-gray-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right px-2 py-3 divide-y divide-gray-200 rounded-md bg-white z-50">
                  <div aria-label="navigation" class="py-1">
                    <nav class="grid gap-1">
                      <Link to='/profile' class="flex items-center leading-6 space-x-3 py-2 px-4 w-full text-sm text-gray-700 focus:outline-none hover:bg-gray-100 rounded-md">
                         <FaUser size={17} />
                        <span>My Profile</span>
                      </Link>
                      <Link to='/calendar' class="flex items-center leading-6 space-x-3 py-2 px-4 w-full text-sm text-gray-700 focus:outline-none hover:bg-gray-100 rounded-md">
                         <FaRegCalendarAlt size={17} />
                        <span>Calendar</span>
                      </Link>
                      <Link to='/users' class="flex items-center leading-6 space-x-3 py-2 px-4 w-full text-sm text-gray-700 focus:outline-none hover:bg-gray-100 rounded-md">
                        <FaUsers size={17} />
                        <span>Users</span>
                      </Link>
                      <Link to='/new-users' class="flex items-center leading-6 space-x-3 py-2 px-4 w-full text-sm text-gray-700 focus:outline-none hover:bg-gray-100 rounded-md">
                        <FaRegEdit size={17} />
                        <span>New Users</span>
                      </Link>
                    </nav>
                  </div>
                  <div aria-label="footer" class="pt-2">
                    <button  type="button" class="flex items-center space-x-3 py-3 px-4 w-full leading-6 text-sm text-gray-600 cursor-pointer rounded-b-md hover:bg-red-400 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path><path d="M9 12h12l-3 -3"></path><path d="M18 15l3 -3"></path>
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
              </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;