import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../constant'
import axios from 'axios'
import { toast } from 'react-toastify'
import { UseAuthContext } from "../../hooks/User";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const { dispatch } = UseAuthContext();

  //function for login to the server
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      setIsLoading(true)
      const response = await axios.post(`${SERVER_URL}/auth/login/`, {
        email,
        password,
      })
      .then((response) => {
        const user = response.data.token;

        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "LOGIN", payload: user });
        toast.success(response?.data?.message)
        navigate('/')
      });

    } catch (err) {
      toast.error(err.response?.data?.message)
      setIsLoading(false)
    }
  }

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please enter your credentials
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                  placeholder="••••••••"
                  minLength="8"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">

              <div className="text-sm">
                <a className="font-medium text-black hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md focus:outline-none ${
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
                'Login'
              )}
            </button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="font-medium text-black hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;