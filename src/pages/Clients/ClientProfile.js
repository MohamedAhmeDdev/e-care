import React from "react";
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import Header from "../../layouts/Header";

import ClientsProgramsCard from "../../components/ClientsProgramsCard";

function ClientProfile() {
  // Client personal information
  const clientInfo = {
    id: "PAT-789456",
    name: "John Doe",
    age: 42,
    gender: "Male",
    dob: "1981-05-15",
    phone: "(555) 123-4567",
    email: "john.doe@example.com",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Client Profile</h1>
        </div>

        {/* Personal Information Column */}
        <div className="lg:col-span-1 space-y-6 pb-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-500 p-4 text-white">
              <h2 className="text-lg font-semibold">Client Summary</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="flex-shrink-0 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {clientInfo.name}
                  </h3>
                  <p className="text-sm text-gray-600">ID: {clientInfo.id}</p>
                </div>
              </div>

              <div className=" max-w-2xl mx-auto space-y-3 flex justify-between items-center">
                <div className="space-y-5">
                  <div className="flex items-center text-sm text-gray-700">
                    <FaUser className="flex-shrink-0 mr-3 text-gray-400" />
                    <span>Gander: {clientInfo.gender}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <FaCalendarAlt className="flex-shrink-0 mr-3 text-gray-400" />
                    <span>
                      DOB: {formatDate(clientInfo.dob)} ({clientInfo.age} years)
                    </span>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center text-sm text-gray-700">
                    <FaPhone className="flex-shrink-0 mr-3 text-gray-400" />
                    <span>{clientInfo.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <FaEnvelope className="flex-shrink-0 mr-3 text-gray-400" />
                    <span>{clientInfo.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Programs Section */}
        <ClientsProgramsCard />
      </div>
    </div>
  );
}

export default ClientProfile;
