import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { FaMoneyBillWave, FaHouseChimney, FaUsers } from "react-icons/fa6";
import { MdSupportAgent, MdOutlineScreenshotMonitor } from "react-icons/md";
import { FaFolder, FaTachometerAlt } from "react-icons/fa";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

const SIDEBAR_ITEMS = [
  { name: "Dashboard",        icon: FaTachometerAlt, href: "/" },
  { name: "Clients",          icon: FaUsers,         href: "/clients" },
  { name: "Register Client",  icon: FaMoneyBillWave, href: "/clients/new" },
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
       {isSidebarOpen && <div className="fixed inset-0 bg-secondary-blue-gray opacity-20 lg:hidden" onClick={toggleSidebar}></div>}

      <div className={`flex flex-col bg-white border-r border-gray-200  fixed lg:relative z-40 w-64 h-screen  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

        {/* Sidebar Header */}
        <div class="flex items-center p-4 border-b border-gray-200">
          <h1 class="text-xl font-bold text-black truncate">e-Care</h1>
          <button onClick={toggleSidebar} className="ml-auto lg:hidden text-gray-500 hover:text-gray-700">
              <IoIosMenu size={30} />
          </button>
        </div>

          <nav className="flex-1 overflow-y-auto pt-4">
            {SIDEBAR_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <div key={item.name} className="space-y-1 px-2 pb-1">
                  <Link 
                    to={item.href || "#"}
                    onClick={(e) => {
                      if (item.submenu) {
                        e.preventDefault();
                        toggleSubmenu(item.name);
                      }else{
                        toggleSidebar();
                      }
                    }}
                  >
                    <div className={`flex items-center rounded-md w-full p-3 text-left text-gray-700 justify-between  hover:bg-secondary-blue-gray transition-colors cursor-pointer ${
                        active ? "bg-secondary-blue-gray" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                        <span className="ml-4 whitespace-nowrap flex-grow">
                          <span className="font-medium text-sm  text-gray-800">{item.name}</span>
                        </span>
                      </div>
                      {item.submenu && (
                        <IoIosArrowDown size={16} className={`transition-transform text-gray-800 ${ openSubmenus[item.name] ? "rotate-180" : "" }`}/>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-gray-200 py-4 px-4 text-center font-semibold text-sm text-gray-600">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Sidebar;