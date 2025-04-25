import React, { useState } from "react";
import {
  FaClipboardList,
  FaChevronDown,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import Search from "../../components/Search";
import Header from "../../layouts/Header";
import { toast } from 'react-toastify';
import { SERVER_URL } from '../../constant';
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { ApiCall } from "../../utils/Api";


function EnrollClient() {``
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  const [formData, setFormData] = useState({
    programs: [],
    medicalHistory: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showProgramsDropdown, setShowProgramsDropdown] = useState(false);

  const healthPrograms = [
    {
      id: 1,
      name: "TB Control Program",
      description: "Comprehensive tuberculosis treatment",
    },
    {
      id: 2,
      name: "Malaria Prevention",
      description: "Community malaria prevention",
    },
    { id: 3, name: "HIV/AIDS Care", description: "Long-term HIV treatment" },
    {
      id: 5,
      name: "Diabetes Management",
      description: "Blood sugar control program",
    },
    {
      id: 6,
      name: "Hypertension Care",
      description: "Blood pressure management",
    },
  ];

  const filteredPrograms = healthPrograms.filter((program) =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleProgram = (programId) => {
    setFormData((prev) => {
      const newPrograms = prev.programs.includes(programId)
        ? prev.programs.filter((id) => id !== programId)
        : [...prev.programs, programId];
      return { ...prev, programs: newPrograms };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const selectedProgramNames = healthPrograms
      .filter((p) => formData.programs.includes(p.id))
      .map((p) => p.name);
  
    try {
      setIsLoading(true);
      const response = await ApiCall(`${SERVER_URL}/enroll/`, 'POST', {
        client_id: id,
        medicalHistory: formData.medicalHistory,
        program_name: selectedProgramNames
      });
      
      toast.success(response?.data?.message);
      navigate(`/clients/${id}/programs`);
    } catch (err) {
      toast.error(err.response?.data?.message);
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <MdHealthAndSafety className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Client Program Enrollment
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Enroll clients in one or more health programs
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {/* Program Selection Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FaClipboardList className="mr-2 text-blue-500" />
                Program Selection
              </h3>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Health Program(s)
                </label>

                <div className="relative">
                  <div
                    className="flex items-center justify-between border border-gray-300 rounded-md p-2 cursor-pointer bg-white"
                    onClick={() =>
                      setShowProgramsDropdown(!showProgramsDropdown)
                    }
                  >
                    <span className="text-gray-500">
                      {formData.programs.length > 0
                        ? `${formData.programs.length} program(s) selected`
                        : "Select programs"}
                    </span>
                    <FaChevronDown
                      className={`text-gray-400 transition-transform ${
                        showProgramsDropdown ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>

                  {showProgramsDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-auto">
                      <div className="p-2 border-b border-gray-200">
                        <Search
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                        />
                      </div>

                      <div className="divide-y divide-gray-200">
                        {filteredPrograms.map((program) => (
                          <div
                            key={program.id}
                            className="p-3 hover:bg-gray-50"
                          >
                            <label className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={formData.programs.includes(program.id)}
                                onChange={() => toggleProgram(program.id)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <div>
                                <span className="block text-sm font-medium text-gray-900">
                                  {program.name}
                                </span>
                                <span className="block text-xs text-gray-500">
                                  {program.description}
                                </span>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Selected Programs Preview */}
                {formData.programs.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Selected Programs:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {healthPrograms
                        .filter((p) => formData.programs.includes(p.id))
                        .map((p) => (
                          <span
                            key={p.id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {p.name}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Medical History Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MdHealthAndSafety className="mr-2 text-blue-500" />
                Medical Information
              </h3>

              <div className="mt-4">
                <label
                  htmlFor="medicalHistory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Medical History Notes
                </label>
                <div className="mt-1">
                  <textarea
                   id="medicalHistory"  // Adding the id for consistency
                   name="medicalHistory" // Ensure that the name is set to "medicalHistory"
                    rows={4}
                    value={formData.medicalHistory}
                    onChange={handleChange}  
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any relevant medical history or notes..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none"
                disabled={formData.programs.length === 0}
              >
                Complete Enrollment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnrollClient;
