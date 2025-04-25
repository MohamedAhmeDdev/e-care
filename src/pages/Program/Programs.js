import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2,} from 'react-icons/fi';
import { MdHealthAndSafety, MdOutlineScience } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';
import Header from '../../layouts/Header';

function Programs() {
  const [searchTerm, setSearchTerm] = useState('');

  const programs = [
    {
      id: 1,
      name: 'TB Control Program',
      code: 'TB-2023',
      description: 'Comprehensive tuberculosis detection and treatment program',
      disease: 'Tuberculosis',
    },
    {
      id: 2,
      name: 'Malaria Prevention',
      code: 'ML-2023',
      description: 'Community-wide malaria prevention and education',
      disease: 'Malaria',
    },
    {
      id: 3,
      name: 'HIV/AIDS Care',
      code: 'HIV-2022',
      description: 'Long-term HIV treatment and support program',
      disease: 'HIV/AIDS',
    }
  ];



  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.disease.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });


  return (
    <div className="bg-gray-50 min-h-screen p-6">
     <Header/>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Health Programs</h1>
          <p className="text-gray-600">Manage disease-specific health programs and interventions</p>
        </div>
         <Link to='/programs/new'>
            <button className="mt-4 md:mt-0 flex items-center bg-black text-white text-sm px-4 py-2 rounded-lg shadow-sm transition-colors">
              <FiPlus className="mr-2" />
              New Program
            </button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      {/* Programs List */}
      <div className="space-y-4">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MdHealthAndSafety className="text-blue-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {program.code}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="flex items-center text-sm text-gray-500">
                        <MdOutlineScience className="mr-1" />
                        {program.disease}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                <button className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50">
                  <Link to={`/programs/${program.id}/edit`}>
                    <FiEdit2 size={18} />
                  </Link>
                </button>
                <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                  <FiTrash2 size={18} />
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {filteredPrograms.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center mt-6">
          <MdHealthAndSafety className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No programs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search or filter' : 'Get started by creating a new health program'}
          </p>
          <div className="mt-6">
          <Link to='/programs/new'>
             <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black focus:outline-none">
              <FiPlus className="-ml-1 mr-2" />
              New Program
            </button>
          </Link>
          </div>
        </div>
      )}

    </div>
  );
}

export default Programs;