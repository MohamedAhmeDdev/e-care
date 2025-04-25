import React from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdHealthAndSafety, MdOutlineScience,} from 'react-icons/md';
import { FormattedDate } from '../utils/FormattedDate';


function ClientsProgramsCard({program}) { 

  return (
    <div key={program.id} className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-sm transition-shadow">
    <div className="p-4">
    <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
        <MdHealthAndSafety className="text-blue-400 text-xl" />
        </div>
        <div className="flex-1 min-w-0">
        <div className="flex items-baseline">
            <h4 className="text-base font-medium text-gray-800 truncate">{program.program.program_name}</h4>
            <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
             {program.program.code}
            </span>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {program.medical_history}
        </p>
        
        <div className="mt-3 space-y-1.5 text-sm">
            <div className="flex items-center text-gray-600">
            <MdOutlineScience className="flex-shrink-0 mr-1.5 text-gray-400" />
            <span>{program.program.disease}</span>
            </div>
            <div className="flex items-center text-gray-600">
            <FaRegCalendarAlt className="flex-shrink-0 mr-1.5 text-gray-400" />
            <span>Enrolled: {FormattedDate(program.enrolled_on)}</span>
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
  )
}

export default ClientsProgramsCard