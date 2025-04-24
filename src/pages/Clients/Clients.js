import React, { useState } from 'react';
import {  FiPlus, FiEdit2, FiTrash2, } from 'react-icons/fi';
import { FaUserInjured, FaRegCalendarAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MdHealthAndSafety} from 'react-icons/md';
import Header from '../../layouts/Header';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';

function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const clients = [
    {
      id: 1,
      name: 'John Doe',
      dob: '1985-03-15',
      gender: 'Male',
      phone: '(555) 123-4567',
      email: 'john.doe@example.com',
      address: '123 Main St, Anytown',
      status: 'active',
      lastVisit: '2023-05-15'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      dob: '1990-07-22',
      gender: 'Female',
      phone: '(555) 987-6543',
      email: 'sarah.smith@example.com',
      address: '456 Oak Ave, Somewhere',
      status: 'active',
      lastVisit: '2023-06-02'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      dob: '1978-11-30',
      gender: 'Male',
      phone: '(555) 456-7890',
      email: 'michael.j@example.com',
      address: '789 Pine Rd, Nowhere',
      status: 'inactive',
      lastVisit: '2022-12-10'
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    const matchesTab = activeTab === 'all' || client.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Header/>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Client Management</h1>
          <p className="text-gray-600">Manage all patient records and information</p>
        </div>
        <Link to='/clients/new'>
        <button 
            className="mt-4 md:mt-0 flex items-center text-sm bg-black text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <FiPlus className="mr-2" />
            New Client
          </button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">gender</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enroll</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaUserInjured className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <FaPhone className="mr-2 text-gray-400" />
                      {client.phone}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <FaEnvelope className="mr-2 text-gray-400" />
                      {client.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">{client.dob}</td>  
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">{client.gender}</td>                         
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/clients/${client.id}/profile`}>
                      <span className='text-blue-400 text-sm hover:underline'> Profile</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/clients/${client.id}/programs`}>
                     <span className='text-blue-400 text-sm hover:underline'>Program</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/clients/${client.id}/enroll`}>
                     <span className='text-blue-400 text-sm hover:underline'>Enroll</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50">
                       <Link to={`/clients/${client.id}/edit`}>
                         <FiEdit2 size={18} />
                        </Link>
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center mt-6">
          <MdHealthAndSafety className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No clients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search or filter' : 'Get started by adding a new client'}
          </p>
          <div className="mt-6">
            <Link to='/clients/new'>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black focus:outline-none"
              >
                <FiPlus className="-ml-1 mr-2" />
                Add Client
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;