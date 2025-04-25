import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { SERVER_URL } from "../../constant";
import axios from "axios";
import { MdHealthAndSafety } from "react-icons/md";
import ClientsProgramsCard from "../../components/ClientsProgramsCard";
import { useParams } from "react-router-dom";

function ClientsPrograms() {
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);
  const { id } = useParams();
  const client_id = id;

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
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
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

export default ClientsPrograms;
