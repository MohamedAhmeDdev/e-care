import React from 'react';
import Header from '../../layouts/Header';
import { FaUserInjured } from 'react-icons/fa';

import ClientsProgramsCard from '../../components/ClientsProgramsCard';

function ClientsPrograms() {
  // Client data
  const clientInfo = {
    id: 'PAT-789456',
    name: 'John Doe',
    age: 42,
    gender: 'Male',
    status: 'Active'
  };



  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <div className="p-6">
        {/* Client Header - More compact */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUserInjured className="text-blue-600 text-2xl" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">{clientInfo.name}</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                  <span className="text-sm text-gray-600">ID: {clientInfo.id}</span>
                  <span className="text-sm text-gray-600">{clientInfo.age} years, {clientInfo.gender}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Programs Section */}
        <ClientsProgramsCard/>

      </div>
    </div>
  );
}

export default ClientsPrograms;