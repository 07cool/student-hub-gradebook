
import React, { useState } from 'react';
import StudentsManagement from './StudentsManagement';
import ResultsManagement from './ResultsManagement';

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  password: string;
}

interface Result {
  studentId: string;
  subject: string;
  score: number;
}

interface User {
  type: 'admin' | 'student';
  name: string;
  username?: string;
}

interface AdminDashboardProps {
  currentUser: User;
  students: Student[];
  results: Result[];
  onLogout: () => void;
  onAddStudent: (student: Omit<Student, 'id'>) => Student;
  onAddResult: (result: Result) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  students,
  results,
  onLogout,
  onAddStudent,
  onAddResult
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'add-student' | 'results'>('dashboard');

  const getGrade = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const totalStudents = students.length;
  const totalResults = results.length;
  const avgScore = results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length) : 0;
  const topPerformers = results.filter(r => r.score >= 90).length;

  const recentResults = results.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">📚 StudentHub</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Admin: {currentUser.name}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'students', label: 'Students' },
              { id: 'add-student', label: 'Add Student' },
              { id: 'results', label: 'All Results' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
              <p className="text-gray-600">Manage students and results</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Students</p>
                    <p className="text-3xl font-bold">{totalStudents}</p>
                  </div>
                  <div className="text-4xl opacity-80">👥</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Average Score</p>
                    <p className="text-3xl font-bold">{avgScore}%</p>
                  </div>
                  <div className="text-4xl opacity-80">📊</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100">Top Performers</p>
                    <p className="text-3xl font-bold">{topPerformers}</p>
                  </div>
                  <div className="text-4xl opacity-80">🏆</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Total Results</p>
                    <p className="text-3xl font-bold">{totalResults}</p>
                  </div>
                  <div className="text-4xl opacity-80">📝</div>
                </div>
              </div>
            </div>

            {/* Recent Results */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Results</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentResults.map((result, index) => {
                      const student = students.find(s => s.id === result.studentId);
                      const grade = getGrade(result.score);
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student ? student.name : 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.studentId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.subject}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.score}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              grade === 'A' ? 'bg-green-100 text-green-800' :
                              grade === 'B' ? 'bg-blue-100 text-blue-800' :
                              grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                              grade === 'D' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {grade}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <StudentsManagement students={students} results={results} />
        )}

        {activeTab === 'add-student' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Add New Student</h2>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
              <AddStudentForm onAddStudent={onAddStudent} />
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <ResultsManagement 
            students={students} 
            results={results} 
            onAddResult={onAddResult} 
          />
        )}
      </main>
    </div>
  );
};

const AddStudentForm: React.FC<{ onAddStudent: (student: Omit<Student, 'id'>) => Student }> = ({ onAddStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = onAddStudent(formData);
    alert(`Student added successfully! Roll Number: ${student.id}`);
    setFormData({ name: '', email: '', class: '', password: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Student Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Class
        </label>
        <select
          value={formData.class}
          onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select Class</option>
          <option value="10th">10th Grade</option>
          <option value="11th">11th Grade</option>
          <option value="12th">12th Grade</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Student Password
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Set password for student login"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Add Student
      </button>
    </form>
  );
};

export default AdminDashboard;
