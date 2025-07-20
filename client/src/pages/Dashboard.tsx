import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-900">Welcome to your Dashboard, {user?.email}!</h1>
        <p className="mt-2 text-center text-lg text-gray-600">This is a private route, only accessible to authenticated users.</p>
        <div className="mt-6">
          <button
            onClick={logout}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;