import React, { useEffect, useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import Header from "../../layouts/Header";
import { SERVER_URL } from "../../constant";
import axios from "axios";
import ClientsProgramsCard from "../../components/ClientsProgramsCard";
import { useParams } from "react-router-dom";
import { FormattedDate } from '../../utils/FormattedDate';

function ClientProfile() {
  const [clientInfo, setClientInfo]=useState([])
   const [enrolledPrograms, setEnrolledPrograms] = useState([]);
  const { id } = useParams();
  const client_id = id;

    // Function to fetch clients by ID from the server
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${SERVER_URL}/client/client/profile/${id}`
          );
          
          setClientInfo(response.data.data);
        } catch (error) {
          console.error(error.response?.data?.message || error.message);
        }
      };
  
      fetchData();
    }, []);

    
  

    // Function to fetch client programs from the server
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${SERVER_URL}/enroll/enrollments/${client_id}`
          );
          console.log(response.data.data);
  
          setEnrolledPrograms(response.data.data);
        } catch (error) {
          console.error(error.response?.data?.message);
        }
      };
  
      fetchData();
    }, []);

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
                    {clientInfo.first_name} {clientInfo.last_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ID: {clientInfo.client_id}
                  </p>
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
                    <span>DOB: {FormattedDate(clientInfo.date_of_birth)}</span>
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
        <div className="mb-6">
          <div className="md:flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Enrolled Health Programs
            </h3>
            <span className="text-sm font-bold text-gray-500">
              {enrolledPrograms.length} program
              {enrolledPrograms.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledPrograms.map((program) => (
              <ClientsProgramsCard program={program} />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {enrolledPrograms.length === 0 && (
          <div className="bg-white rounded-lg shadow-xs border border-gray-100 p-8 text-center">
            <MdHealthAndSafety className="mx-auto text-gray-300 text-3xl" />
            <h3 className="mt-3 text-base font-medium text-gray-700">
              No enrolled programs
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {" "}
              This client is not currently enrolled in any health programs
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientProfile;
