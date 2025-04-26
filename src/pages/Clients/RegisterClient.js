import React, { useState } from 'react'
import Header from '../../layouts/Header'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../../constant'
import axios from 'axios'
import { toast } from 'react-toastify'

function RegisterClient() {
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [date_of_birth, setDate_of_birth] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  
//function for creating new client to the server
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
  
    try {
      setIsLoading(true)
      const response = await axios.post(`${SERVER_URL}/client/`, {
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone,
      })
      
      toast.success(response?.data?.message)
      navigate('/')
    } catch (err) {
       toast.error(err.response?.data?.message)
      setIsLoading(false)
    }
  }
  

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Header/>

      <div className="bg-white rounded-lg shadow-xl max-w-3xl mx-auto w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900">Add New Client</h3>
          </div>

          {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                  type="text"
                  required
                  autoComplete="given-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                  type="text"
                  required
                  autoComplete="family-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>


              <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  autoComplete="tel"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  value={date_of_birth}
                  onChange={(e) => setDate_of_birth(e.target.value)}
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  name="gender"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>


            <div className="bg-gray-50 px-6 py-4 flex justify-center lg:justify-end border-t">
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
                  ' Save Client'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterClient