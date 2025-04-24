import React from 'react';
import Header from '../layouts/Header';
import { FaUserInjured, FaProcedures, FaCalendarCheck, FaFileMedical } from 'react-icons/fa';
import { MdHealthAndSafety, MdLocalPharmacy } from 'react-icons/md';
import { FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Dashboard() {
  // Sample data - replace with real data from your API
  const stats = [
    { title: "programs", value: "1,248", icon: <MdHealthAndSafety className="text-blue-500" size={24} /> },
    { title: "clients", value: "34", icon: <FaProcedures className="text-purple-500" size={24} /> },
    { title: "enrollments", value: "189", icon: <FaCalendarCheck className="text-green-500" size={24} /> },
  ];

  const recentActivities = [
    { id: 1, patient: "John Doe",  time: "10 mins ago"},
    { id: 2, patient: "Sarah Smith", time: "25 mins ago" },
    { id: 3, patient: "Michael Johnson",  time: "1 hour ago",},
    { id: 4, patient: "Emily Wilson", time: "2 hours ago" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <div className="p-6">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-800">{stat.value}</h3>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">

            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Enrollment</h2>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                    <div className='p-2 rounded-lg mr-4 
                      bg-blue-100 text-blue-600
                    '>
                      <FaUserInjured size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{activity.patient}</h4>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions and Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Link to='/clients/new'>
                   <div className='flex flex-col items-center justify-center'>
                     <FaUserInjured className="text-blue-500 mb-2" size={24} />
                     <span className="text-sm font-medium text-gray-700">New cLient</span>
                   </div>
                  </Link>
                 </button>

                  <button className=" p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <Link to='/programs/new'>
                    <div className='flex flex-col items-center justify-center'>
                      <MdHealthAndSafety className="text-green-500 mb-2" size={20} />
                      <span className="text-sm font-medium text-gray-700">New Program</span>
                    </div>
                    </Link>
                  </button>

                  <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <Link to='/clients'>
                    <div className='flex flex-col items-center justify-center'>
                      <MdLocalPharmacy className="text-purple-500 mb-2" size={24} />
                      <span className="text-sm font-medium text-gray-700">Client List</span>
                    </div>
                    </Link>
                  </button>
                
                  <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                    <Link to='/programs'>
                     <div className='flex flex-col items-center justify-center'>
                       <FaFileMedical className="text-yellow-500 mb-2" size={20} />
                       <span className="text-sm font-medium text-gray-700">programs</span>
                     </div>
                    </Link>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;