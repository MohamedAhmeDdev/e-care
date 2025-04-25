import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UpdateProgram() {
  const [programName, setProgramName] = useState("")
  const [code, setCode] = useState("")
  const [disease, setDisease] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!programName || !code || !disease || !description) {
      setError('Please fill in all required fields')
      return
    }
    
    try {
      setIsLoading(true)
      // API call 
      
      setTimeout(() => {
        alert('Program created successfully!')
        setIsLoading(false)
        // Redirect to dashboard page after successful creation
        navigate('/programs')
      }, 1000)
    } catch (err) {
      setError(err.message || 'Creation failed. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl mx-auto w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900">Update Health Program</h3>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="program-name" className="block text-sm font-medium text-gray-700">
                  Program Name
                </label>
                <input
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="program-code" className="block text-sm font-medium text-gray-700">
                  Program Code
                </label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="disease" className="block text-sm font-medium text-gray-700">
                  Disease Focus
                </label>
                <select
                  value={disease}
                  onChange={(e) => setDisease(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                >
                  <option value="">Select disease...</option>
                  <option value="Tuberculosis (TB)">Tuberculosis (TB)</option>
                  <option value="Malaria">Malaria</option>
                  <option value="HIV/AIDS">HIV/AIDS</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Hypertension">Hypertension</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="program-description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end border-t">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-40 px-4 py-2 text-sm font-medium text-white bg-black rounded-md focus:outline-none ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-800'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 mx-auto animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </>
                ) : (
                  'Create Program'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProgram