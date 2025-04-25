import React from 'react'
import { FaUserInjured, FaRegCalendarAlt } from 'react-icons/fa';
import { MdHealthAndSafety, MdOutlineScience, MdOutlineDescription } from 'react-icons/md';



function ClientsProgramsCard() {
      // Enrolled programs data
  const enrolledPrograms = [
    {
      id: 'TB-789',
      name: 'TB Control Program',
      description: 'Comprehensive tuberculosis detection and treatment program',
      disease: 'Tuberculosis',
      enrollmentDate: '2023-01-20',
      caseManager: 'Dr. Sarah Johnson',
    },
    {
      id: 'HIV-456',
      name: 'HIV/AIDS Care',
      description: 'Long-term HIV treatment and support program',
      disease: 'HIV/AIDS',
      enrollmentDate: '2022-09-15',
      caseManager: 'Dr. Michael Chen',
    },
    {
      id: 'DM-123',
      name: 'Diabetes Management',
      description: 'Blood sugar control and lifestyle management program',
      disease: 'Diabetes',
      enrollmentDate: '2021-11-10',
      caseManager: 'Dr. Emily Wilson',
    }
  ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
    };


  return (
    <div>
        <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Enrolled Health Programs</h3>
                    <span className="text-sm text-gray-500">
                    {enrolledPrograms.length} program{enrolledPrograms.length !== 1 ? 's' : ''}
                    </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enrolledPrograms.map(program => (
                    <div key={program.id} className="bg-white rounded-lg shadow-xs border border-gray-100 hover:shadow-sm transition-shadow">
                        <div className="p-4">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                            <MdHealthAndSafety className="text-blue-400 text-xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                            <div className="flex items-baseline">
                                <h4 className="text-base font-medium text-gray-800 truncate">{program.name}</h4>
                                <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                {program.id}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {program.description}
                            </p>
                            
                            <div className="mt-3 space-y-1.5 text-sm">
                                <div className="flex items-center text-gray-600">
                                <MdOutlineScience className="flex-shrink-0 mr-1.5 text-gray-400" />
                                <span>{program.disease}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                <FaRegCalendarAlt className="flex-shrink-0 mr-1.5 text-gray-400" />
                                <span>Enrolled: {formatDate(program.enrollmentDate)}</span>
                                </div>
                                <div className="text-gray-600">
                                <span className="text-gray-500">Case Manager: </span>
                                <span className="font-medium">{program.caseManager}</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
        </div>

        {/* Empty State */}
        {enrolledPrograms.length === 0 && (
            <div className="bg-white rounded-lg shadow-xs border border-gray-100 p-8 text-center">
            <MdHealthAndSafety className="mx-auto text-gray-300 text-3xl" />
            <h3 className="mt-3 text-base font-medium text-gray-700">No enrolled programs</h3>
            <p className="mt-1 text-sm text-gray-500"> This client is not currently enrolled in any health programs</p>
            </div>
        )}
     </div>
  )
}

export default ClientsProgramsCard