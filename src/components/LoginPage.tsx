
import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  password: string;
}

interface User {
  type: 'admin' | 'student';
  id?: string;
  name: string;
  email?: string;
  class?: string;
  username?: string;
}

interface LoginPageProps {
  onLogin: (user: User) => void;
  students: Student[];
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, students }) => {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [formData, setFormData] = useState({
    studentRoll: '',
    studentPassword: '',
    adminUsername: '',
    adminPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => 
      s.id === formData.studentRoll && s.password === formData.studentPassword
    );
    
    if (student) {
      onLogin({
        type: 'student',
        id: student.id,
        name: student.name,
        email: student.email,
        class: student.class
      });
    } else {
      alert('Invalid roll number or password!');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.adminUsername === 'admin' && formData.adminPassword === 'admin123') {
      onLogin({
        type: 'admin',
        name: 'Administrator',
        username: formData.adminUsername
      });
    } else {
      alert('Invalid admin credentials!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">📚 StudentHub</h1>
          <p className="text-gray-600">Student Result Management System</p>
        </div>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'student' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab('student')}
          >
            Student Login
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'admin' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Login
          </button>
        </div>

        {activeTab === 'student' ? (
          <form onSubmit={handleStudentLogin} className="space-y-4">
            <h3 className="text-xl font-semibold text-center mb-4">Student Login</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Roll Number
              </label>
              <input
                type="text"
                value={formData.studentRoll}
                onChange={(e) => handleInputChange('studentRoll', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your roll number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.studentPassword}
                onChange={(e) => handleInputChange('studentPassword', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Login as Student
            </button>
          </form>
        ) : (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <h3 className="text-xl font-semibold text-center mb-4">Admin Login</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={formData.adminUsername}
                onChange={(e) => handleInputChange('adminUsername', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter admin username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.adminPassword}
                onChange={(e) => handleInputChange('adminPassword', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Login as Admin
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
