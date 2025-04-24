import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { FaMoneyBillWave, FaHouseChimney, FaUsers } from "react-icons/fa6";
import { FaTachometerAlt  } from "react-icons/fa";
import { CiLogout   } from "react-icons/ci";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import Logo from '../assets/logo.jpg'

const SIDEBAR_ITEMS = [
  { name: "Dashboard",        icon: FaTachometerAlt, href: "/" },
  { name: "Clients",          icon: FaUsers,         href: "/clients" },
  { name: "Register Client",  icon: FaUsers, href: "/clients/new" },
  { name: "Programs",         icon: FaHouseChimney,  href: "/programs" },
  { name: "Create Program",   icon: FaHouseChimney,  href: "/programs/new" },
];

const Sidebar = () => {
  const [openSubmenus, setOpenSubmenus] = useState({});
  const location = useLocation();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (item) => {
    if (item.href === location.pathname) return true;
    if (item.submenu) return item.submenu.some((subItem) => subItem.href === location.pathname);
    return false;
  };

  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 lg:hidden z-30 transition-opacity duration-300" 
          onClick={toggleSidebar}
        />
      )}

      <div 
        className={`flex flex-col bg-white fixed lg:relative z-40 w-64 h-screen transition-transform duration-300 ease-in-out shadow-lg ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center p-5 border-b border-gray-100">
          <img src={Logo} className="w-10 h-10 rounded-md" />
          <h1 className="text-xl font-bold text-black pl-5">e-Care</h1>
          <button 
            onClick={toggleSidebar} 
            className="ml-auto lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
          >
            <IoIosMenu size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {SIDEBAR_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <div key={item.name} className="mb-1">
                <Link 
                  to={item.href || "#"}
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault();
                      toggleSubmenu(item.name);
                    } else {
                      toggleSidebar();
                    }
                  }}
                >
                  <div
                    className={`flex items-center w-full p-3 text-left rounded-lg transition-all duration-200 ${
                      active 
                        ? "bg-gray-100 text-black font-medium shadow-sm"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-center w-6 h-6">
                      <item.icon 
                        size={18} 
                        className={active ? "text-gray-800" : "text-gray-500"} 
                      />
                    </div>
                    <span className="ml-3 text-sm">{item.name}</span>
                    {item.submenu && (
                      <IoIosArrowDown 
                        size={14} 
                        className={`ml-auto transition-transform ${
                          openSubmenus[item.name] ? "rotate-180" : ""
                        } ${active ? "text-gray-700" : "text-gray-400"}`}
                      />
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="position bottom-0">
          <div className="flex items-center font-semibold  w-full p-3 text-center rounded-lg text-gray-600 bg-gray-50 cursor-pointer">
            <CiLogout className="font-bold" />
            <p className="pl-2">logout</p>
          </div>
        </div>
        <div className="mt-auto border-t border-gray-100 py-4 px-5 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} e-Care. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Sidebar;