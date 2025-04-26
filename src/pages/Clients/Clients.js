import React, { useEffect, useState } from 'react';
import {  FiPlus, FiEdit2, FiTrash2, } from 'react-icons/fi';
import { FaUserInjured, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MdHealthAndSafety} from 'react-icons/md';
import Header from '../../layouts/Header';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';
import { SERVER_URL } from '../../constant';
import axios from 'axios'
import { FormattedDate } from '../../utils/FormattedDate';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/DeleteModal';


function Clients() {
  const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleDeleteClick = (client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

// Function to fetch clients from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/client/clients`);        
        setClients(response.data.data);
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    };
  
    fetchData();
  }, []);
  
  // Function for searching clients
  const filteredClients = clients.filter(client => {
    const matchesSearch =
     client.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     client.last_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     client.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch 
  });


// Function for deleting clients from the server
const deleteClient = async (clientId) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/client/${clientId}`);
    setClients(prevClients => prevClients.filter(client => client.client_id !== clientId));
        toast.success(response?.data?.message)
  } catch (error) {
      toast.error(error.response?.data?.message)
  }
};
  

  return (
    <div className="bg-gray-50 min-h-screen p-2 md:p-6">
      <Header/>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Client Management</h1>
          <p className="text-gray-600">Manage all patient records and information</p>
        </div>
        <Link to='/clients/new'>
        <button className="mt-4 md:mt-0 flex items-center text-sm bg-black text-white px-4 py-2 rounded-lg shadow-sm transition-colors" >
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
                        <div className="text-sm font-medium text-gray-900">{client.first_name} {clients.last_name}</div>
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
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm"> {FormattedDate(client.date_of_birth)}</td>  
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">{client.gender}</td>                         
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/clients/${client.client_id}/profile`}>
                      <span className='text-blue-400 text-sm hover:underline'> Profile</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/clients/${client.client_id}/programs`}>
                     <span className='text-blue-400 text-sm hover:underline'>Program</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/clients/${client.client_id}/enroll`}>
                     <span className='text-blue-400 text-sm hover:underline'>Enroll</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50">
                       <Link to={`/clients/${client.client_id}/edit`}>
                         <FiEdit2 size={18} />
                        </Link>
                      </button>
                      <button  onClick={() => handleDeleteClick(client)}  className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
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

      {showDeleteModal && selectedClient && (
              <DeleteModal
                client={selectedClient}
                onClose={() => setShowDeleteModal(false)}
                onDelete={() => deleteClient(selectedClient.client_id)}
              />
      )}
    </div>
  );
}

export default Clients;