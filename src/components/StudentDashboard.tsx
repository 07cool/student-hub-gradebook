
import React from 'react';

interface Result {
  studentId: string;
  subject: string;
  score: number;
}

interface User {
  type: 'admin' | 'student';
  id?: string;
  name: string;
  email?: string;
  class?: string;
}

interface StudentDashboardProps {
  currentUser: User;
  results: Result[];
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUser,
  results,
  onLogout
}) => {
  const getGrade = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const totalSubjects = results.length;
  const avgScore = totalSubjects > 0 ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / totalSubjects) : 0;
  const highestScore = totalSubjects > 0 ? Math.max(...results.map(r => r.score)) : 0;
  const passedSubjects = results.filter(r => r.score >= 60).length;

  console.log('Student results loaded:', results);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">📚 StudentHub</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {currentUser.name} ({currentUser.id})
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

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome, {currentUser.name}</h2>
          <p className="text-gray-600">View your academic performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Subjects</p>
                <p className="text-3xl font-bold">{totalSubjects}</p>
              </div>
              <div className="text-4xl opacity-80">📚</div>
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
                <p className="text-yellow-100">Highest Score</p>
                <p className="text-3xl font-bold">{highestScore}%</p>
              </div>
              <div className="text-4xl opacity-80">🏆</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Passed Subjects</p>
                <p className="text-3xl font-bold">{passedSubjects}</p>
              </div>
              <div className="text-4xl opacity-80">✅</div>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Your Results</h3>
          {results.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">📄</div>
              <p className="text-gray-500 text-lg">No results available yet.</p>
              <p className="text-gray-400">Check back later for your exam results.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result, index) => {
                    const grade = getGrade(result.score);
                    const passed = result.score >= 60;
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {result.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`font-semibold ${result.score >= 90 ? 'text-green-600' : result.score >= 70 ? 'text-blue-600' : result.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {result.score}%
                          </span>
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {passed ? 'Passed' : 'Failed'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
